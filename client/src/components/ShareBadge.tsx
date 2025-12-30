import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import type { MajorMatch } from "@/lib/matchingAlgorithm";

interface ShareBadgeProps {
  match: MajorMatch;
}

interface BadgeContentProps {
  match: MajorMatch;
  size?: "preview" | "export";
}

function BadgeContent({ match, size = "preview" }: BadgeContentProps) {
  const scale = size === "export" ? 2.7 : 1;
  const width = size === "export" ? 1080 : 400;
  const height = size === "export" ? 1080 : 400;
  
  return (
    <div 
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 50%, #3d5a7f 100%)',
        borderRadius: size === "export" ? '0' : '16px',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: `${24 * scale}px`,
        color: 'white',
        boxSizing: 'border-box',
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: `${12 * scale}px`,
          marginBottom: `${24 * scale}px`,
        }}>
          <div style={{
            width: `${40 * scale}px`,
            height: `${40 * scale}px`,
            backgroundColor: 'white',
            borderRadius: `${8 * scale}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${20 * scale}px`,
          }}>
            🎓
          </div>
          <div>
            <p style={{ 
              fontWeight: 700, 
              fontSize: `${14 * scale}px`, 
              lineHeight: 1.2,
              margin: 0,
            }}>Phoenicia University</p>
            <p style={{ 
              color: 'rgba(255,255,255,0.7)', 
              fontSize: `${12 * scale}px`,
              margin: 0,
            }}>Major Matcher</p>
          </div>
        </div>

        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: `${80 * scale}px`, marginBottom: `${16 * scale}px` }}>
            {match.major.icon}
          </div>
          
          <p style={{ 
            color: 'rgba(255,255,255,0.8)', 
            fontSize: `${12 * scale}px`, 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em',
            marginBottom: `${8 * scale}px`,
            margin: 0,
          }}>My Perfect Match</p>
          
          <h2 style={{ 
            fontSize: `${22 * scale}px`, 
            fontWeight: 700, 
            marginBottom: `${8 * scale}px`,
            padding: `0 ${16 * scale}px`,
            lineHeight: 1.2,
            margin: `0 0 ${8 * scale}px 0`,
          }}>
            {match.major.name}
          </h2>
          
          <p style={{ 
            color: '#f5c842', 
            fontSize: `${13 * scale}px`, 
            fontWeight: 500,
            marginBottom: `${24 * scale}px`,
            margin: `0 0 ${24 * scale}px 0`,
          }}>
            {match.major.college}
          </p>

          <div style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: `${16 * scale}px`,
            padding: `${16 * scale}px ${32 * scale}px`,
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <div style={{ 
              fontSize: `${48 * scale}px`, 
              fontWeight: 700, 
              color: '#f5c842',
              lineHeight: 1,
            }}>
              {match.matchPercentage}%
            </div>
            <p style={{ 
              color: 'rgba(255,255,255,0.8)', 
              fontSize: `${12 * scale}px`, 
              marginTop: `${4 * scale}px`,
              margin: `${4 * scale}px 0 0 0`,
            }}>Match Score</p>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          paddingTop: `${16 * scale}px`,
          borderTop: '1px solid rgba(255,255,255,0.2)',
        }}>
          <p style={{ 
            color: 'rgba(255,255,255,0.6)', 
            fontSize: `${11 * scale}px`,
            marginBottom: `${4 * scale}px`,
            margin: `0 0 ${4 * scale}px 0`,
          }}>Find your perfect major at</p>
          <p style={{ 
            color: '#f5c842', 
            fontWeight: 700, 
            fontSize: `${13 * scale}px`,
            margin: 0,
          }}>pu.edu.lb/major-matcher</p>
        </div>
      </div>
    </div>
  );
}

export default function ShareBadge({ match }: ShareBadgeProps) {
  const exportRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const downloadBadge = useCallback(async () => {
    setIsDownloading(true);
    
    try {
      await new Promise(resolve => requestAnimationFrame(resolve));
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (!exportRef.current) return;
      
      const canvas = await html2canvas(exportRef.current, {
        backgroundColor: '#1e3a5f',
        scale: 1,
        useCORS: true,
        logging: false,
        width: 1080,
        height: 1080,
      });
      
      const link = document.createElement('a');
      link.download = `pu-major-match-${match.major.key}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Failed to download badge:', error);
    } finally {
      setIsDownloading(false);
    }
  }, [match.major.key]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-white/50 text-white hover:bg-white hover:text-[hsl(220,70%,25%)]"
          data-testid="button-create-badge"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Create Shareable Badge
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[hsl(220,30%,15%)]">Your Major Match Badge</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <BadgeContent match={match} size="preview" />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={downloadBadge}
              disabled={isDownloading}
              className="bg-[hsl(220,70%,25%)] hover:bg-[hsl(220,70%,20%)] text-white"
              data-testid="button-download-badge"
            >
              <Download className="w-4 h-4 mr-2" />
              {isDownloading ? 'Downloading...' : 'Download Badge'}
            </Button>
          </div>

          <p className="text-gray-500 text-sm text-center max-w-sm">
            Download your 1080x1080 badge and share it on Instagram, Facebook, Twitter, or WhatsApp!
          </p>
        </div>
      </DialogContent>

      <div 
        ref={exportRef}
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '-9999px',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <BadgeContent match={match} size="export" />
      </div>
    </Dialog>
  );
}
