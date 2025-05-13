import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, Mic, MicOff, Video, VideoOff, Users, Share, Download } from 'lucide-react';

const ClassroomVideoCall = () => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Initialize camera when component mounts
    initializeCamera();

    // Cleanup when component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      streamRef.current = stream;
      
      // Initialize mediaRecorder for recording
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };
      
      mediaRecorder.onstop = () => {
        console.log('Media recorder stopped');
      };
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Access Error",
        description: "Could not access your camera or microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const toggleMicrophone = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !isMicEnabled;
      });
      setIsMicEnabled(!isMicEnabled);
    }
  };

  const toggleCamera = () => {
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !isCameraEnabled;
      });
      setIsCameraEnabled(!isCameraEnabled);
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      // Start recording
      if (mediaRecorderRef.current) {
        setRecordedChunks([]);
        mediaRecorderRef.current.start();
        setIsRecording(true);
        
        toast({
          title: "Recording Started",
          description: "Your session is now being recorded.",
        });
      }
    } else {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        
        toast({
          title: "Recording Stopped",
          description: "Your recording is ready to download.",
        });
      }
    }
  };

  const toggleScreenSharing = async () => {
    try {
      if (!isScreenSharing) {
        // Start screen sharing
        const displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = displayStream;
        }
        
        // Stop camera tracks but keep the reference
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        
        streamRef.current = displayStream;
        setIsScreenSharing(true);
        
        // Update mediaRecorder to record screen sharing
        const mediaRecorder = new MediaRecorder(displayStream);
        mediaRecorderRef.current = mediaRecorder;
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setRecordedChunks(prev => [...prev, event.data]);
          }
        };
        
        if (isRecording) {
          mediaRecorder.start();
        }
        
        // Handle the case when user stops screen sharing via the browser UI
        displayStream.getVideoTracks()[0].onended = () => {
          initializeCamera();
          setIsScreenSharing(false);
        };
      } else {
        // Stop screen sharing and go back to camera
        initializeCamera();
        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error('Error sharing screen:', error);
      toast({
        title: "Screen Sharing Error",
        description: "Could not share your screen. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadRecording = () => {
    if (recordedChunks.length === 0) {
      toast({
        title: "No Recording Available",
        description: "There is no recording to download.",
        variant: "destructive",
      });
      return;
    }
    
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = `atzaan-classroom-recording-${new Date().toISOString()}.webm`;
    a.click();
    
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: "Download Started",
      description: "Your recording is being downloaded.",
    });
  };

  return (
    <Card className="border-atzaan-soft-purple">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <div className="relative rounded-lg overflow-hidden bg-gray-900">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                muted
                className="w-full aspect-video bg-black"
              />
              
              {isRecording && (
                <div className="absolute top-4 right-4 flex items-center gap-2 px-2 py-1 bg-red-600 text-white rounded-full animate-pulse">
                  <span className="h-2 w-2 bg-white rounded-full"></span>
                  <span className="text-sm font-medium">Recording</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Button
                variant="outline"
                className="flex gap-2"
                onClick={toggleMicrophone}
              >
                {isMicEnabled ? <Mic /> : <MicOff />}
                {isMicEnabled ? "Mute" : "Unmute"}
              </Button>
              
              <Button
                variant="outline"
                className="flex gap-2"
                onClick={toggleCamera}
              >
                {isCameraEnabled ? <VideoOff /> : <Video />}
                {isCameraEnabled ? "Hide Camera" : "Show Camera"}
              </Button>
              
              <Button
                variant={isScreenSharing ? "outline" : "secondary"}
                className="flex gap-2"
                onClick={toggleScreenSharing}
              >
                <Share />
                {isScreenSharing ? "Stop Sharing" : "Share Screen"}
              </Button>
              
              <Button
                variant={isRecording ? "destructive" : "default"}
                className="bg-atzaan-purple hover:bg-atzaan-purple/90 flex gap-2"
                onClick={toggleRecording}
              >
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
              
              <Button
                variant="outline"
                className="flex gap-2"
                onClick={downloadRecording}
                disabled={recordedChunks.length === 0}
              >
                <Download />
                Download Recording
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Session Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-atzaan-purple" />
                <span>Today, {new Date().toLocaleTimeString()}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-atzaan-purple" />
                <span>1 participant</span>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-md mt-4">
                <h4 className="text-sm font-medium text-gray-700">Session Controls</h4>
                <p className="text-xs text-gray-500 mt-1">
                  You can record this session, share your screen, and download the recording when finished.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassroomVideoCall;
