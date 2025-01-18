'use client'
import { useEffect, useState, useRef } from "react";
import TrumpTerminal from '@/components/TrumpTerminal';
import PixelTitle from '@/components/PixelTitle';
import PixelBackground from '@/components/PixelBackground';
import PixelSocials from '@/components/PixelSocials';
import GlitchTextBox from '@/components/GlitchTextBox';

export default function Home() {
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [text, setText] = useState("");
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initializeAudio = () => {
    if (!audioElementRef.current || audioContextRef.current) return;

    const context = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const audioAnalyser = context.createAnalyser();
    audioAnalyser.fftSize = 2048;
    audioAnalyser.smoothingTimeConstant = 0.8;

    const mediaSource = context.createMediaElementSource(
      audioElementRef.current
    );
    mediaSource.connect(audioAnalyser);
    audioAnalyser.connect(context.destination);

    audioContextRef.current = context;
    analyserRef.current = audioAnalyser;
    mediaSourceRef.current = mediaSource;

    setAudioContext(context);
    setAnalyser(audioAnalyser);

    const dataArray = new Uint8Array(audioAnalyser.frequencyBinCount);
    const updateData = () => {
      audioAnalyser.getByteFrequencyData(dataArray);
      setAudioData(new Uint8Array(dataArray));
      requestAnimationFrame(updateData);
    };
    updateData();
  };
  const handleResponse = (response: string) => {
    setText(response);
  };
  const speakText = async () => {
    if (!text) return;

    try {
      const response = await fetch(
        "https://api.elevenlabs.io/v1/text-to-speech/KpRapMzDhlSxtc7Yljij",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": "",
          },
          body: JSON.stringify({
            text: text,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 1,
              style: 0.5,
              use_speaker_boost: true,
            },
          }),
        }
      );

      if (!response.ok) throw new Error("TTS request failed");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioElementRef.current) {
        if (!audioContextRef.current) {
          initializeAudio();
        }
        audioElementRef.current.src = audioUrl;
        audioElementRef.current.load();
        try {
          await audioElementRef.current.play();
          console.log("Audio is playing!");
        } catch (err) {
          console.error("Error playing audio:", err);
        }
      }
    } catch (error) {
      console.error("Error generating speech:", error);
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };
  useEffect(() => {
    if (text) {
      speakText();
    }
  }, [text]);
  return (
    <main className="min-h-screen p-4">
      <PixelBackground />
      <div className="max-w-3xl mx-auto space-y-4">
      <div className="relative h-300px">
                    <audio
                      ref={audioElementRef}
                      controls
                      style={{ display: "none" }}
                      onPlay={() => {
                        if (!audioContextRef.current) {
                          initializeAudio();
                        }
                      }}
                    />
                    <div className="absolute top-0 left-0 z-10 p-4 rounded-lg m-4 hidden">
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-64 h-32 p-2 bg-gray-800 text-white rounded-lg"
                        placeholder="Enter your text..."
                      />
                      <button
                        onClick={speakText}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
                      >
                        Convert to speech
                      </button>
                    </div>
                  </div>
        <PixelTitle />
        <GlitchTextBox />
        <TrumpTerminal  onResponse={handleResponse}/>
        <PixelSocials/>
      </div>
    </main>
  );
}