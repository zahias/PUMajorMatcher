import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import type { MajorMatch } from "@/lib/matchingAlgorithm";

interface ShareBadgeProps {
  matches: MajorMatch[];
}

interface BadgeContentProps {
  matches: MajorMatch[];
  size?: "preview" | "export";
}

function BadgeContent({ matches, size = "preview" }: BadgeContentProps) {
  const scale = size === "export" ? 2.84 : 1;
  const width = size === "export" ? 1080 : 380;
  const match = matches[0];
  
  return (
    <div 
      style={{
        width: `${width}px`,
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 50%, #3d5a7f 100%)',
        borderRadius: size === "export" ? '0' : '16px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: `${20 * scale}px`,
        color: 'white',
        boxSizing: 'border-box',
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: `${10 * scale}px`,
          marginBottom: `${16 * scale}px`,
        }}>
          <div style={{
            width: `${36 * scale}px`,
            height: `${36 * scale}px`,
            backgroundColor: 'white',
            borderRadius: `${8 * scale}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${18 * scale}px`,
          }}>
            🎓
          </div>
          <div>
            <p style={{ 
              fontWeight: 700, 
              fontSize: `${13 * scale}px`, 
              lineHeight: 1.2,
              margin: 0,
            }}>Phoenicia University</p>
            <p style={{ 
              color: 'rgba(255,255,255,0.7)', 
              fontSize: `${11 * scale}px`,
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
          marginBottom: `${12 * scale}px`,
        }}>
          <div style={{ fontSize: `${56 * scale}px`, marginBottom: `${10 * scale}px` }}>
            {match.major.icon}
          </div>
          
          <p style={{ 
            color: 'rgba(255,255,255,0.8)', 
            fontSize: `${10 * scale}px`, 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em',
            marginBottom: `${4 * scale}px`,
            margin: 0,
          }}>My Perfect Match</p>
          
          <h2 style={{ 
            fontSize: `${18 * scale}px`, 
            fontWeight: 700, 
            marginBottom: `${4 * scale}px`,
            padding: `0 ${10 * scale}px`,
            lineHeight: 1.2,
            margin: `0 0 ${4 * scale}px 0`,
          }}>
            {match.major.name}
          </h2>
          
          <p style={{ 
            color: '#f5c842', 
            fontSize: `${11 * scale}px`, 
            fontWeight: 500,
            marginBottom: `${12 * scale}px`,
            margin: `0 0 ${12 * scale}px 0`,
          }}>
            {match.major.college}
          </p>

          <div style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: `${10 * scale}px`,
            padding: `${14 * scale}px ${24 * scale}px`,
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <div style={{ 
              fontSize: `${36 * scale}px`, 
              fontWeight: 700, 
              color: '#f5c842',
              lineHeight: 1.2,
              marginBottom: `${6 * scale}px`,
            }}>
              {match.matchPercentage}%
            </div>
            <p style={{ 
              color: 'rgba(255,255,255,0.8)', 
              fontSize: `${9 * scale}px`, 
              margin: 0,
            }}>Match Score</p>
          </div>
        </div>

        {matches.length > 1 && (
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: `${8 * scale}px`,
            padding: `${10 * scale}px`,
            marginBottom: `${10 * scale}px`,
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <p style={{ 
              color: 'rgba(255,255,255,0.7)', 
              fontSize: `${8 * scale}px`, 
              margin: `0 0 ${6 * scale}px 0`,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>Also a great fit:</p>
            <div style={{ display: 'flex', gap: `${6 * scale}px`, flexDirection: 'column' }}>
              {matches.slice(1, 3).map((m, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: `${6 * scale}px` }}>
                  <span style={{ fontSize: `${18 * scale}px` }}>{m.major.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ 
                      fontSize: `${9 * scale}px`, 
                      fontWeight: 600, 
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>{m.major.name}</p>
                    <p style={{ 
                      fontSize: `${8 * scale}px`, 
                      color: '#f5c842', 
                      margin: 0,
                    }}>{m.matchPercentage}% match</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{
          textAlign: 'center',
          paddingTop: `${10 * scale}px`,
          borderTop: '1px solid rgba(255,255,255,0.2)',
        }}>
          <p style={{ 
            color: 'rgba(255,255,255,0.6)', 
            fontSize: `${9 * scale}px`,
            marginBottom: `${2 * scale}px`,
            margin: `0 0 ${2 * scale}px 0`,
          }}>Find your perfect major at</p>
          <p style={{ 
            color: '#f5c842', 
            fontWeight: 700, 
            fontSize: `${11 * scale}px`,
            margin: 0,
          }}>pu.edu.lb</p>
        </div>
      </div>
    </div>
  );
}

export default function ShareBadge({ matches }: ShareBadgeProps) {
  const exportRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const downloadBadge = useCallback(async () => {
    setIsDownloading(true);
    
    try {
      if (!exportRef.current) return;
      
      // Temporarily make visible for capture
      const originalStyle = exportRef.current.style.cssText;
      exportRef.current.style.cssText = 'position: fixed; left: 0; top: 0; z-index: 9999;';
      
      await new Promise(resolve => requestAnimationFrame(resolve));
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const elementWidth = exportRef.current.scrollWidth;
      const elementHeight = exportRef.current.scrollHeight;
      
      const canvas = await html2canvas(exportRef.current, {
        backgroundColor: '#1e3a5f',
        scale: 1,
        useCORS: true,
        logging: false,
        width: elementWidth,
        height: elementHeight,
      });
      
      // Restore hidden state
      exportRef.current.style.cssText = originalStyle;
      
      const link = document.createElement('a');
      link.download = `pu-major-match-${matches[0].major.key}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Failed to download badge:', error);
    } finally {
      setIsDownloading(false);
    }
  }, [matches]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-[hsl(45,90%,50%)] hover:bg-[hsl(45,85%,45%)] text-[hsl(220,70%,15%)] font-semibold"
          data-testid="button-create-badge"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Create Shareable Badge
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[hsl(220,30%,15%)] text-lg">Your Major Match Badge</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="rounded-2xl shadow-2xl w-full max-w-[380px] mx-auto">
            <BadgeContent matches={matches} size="preview" />
          </div>

          <Button
            onClick={downloadBadge}
            disabled={isDownloading}
            className="bg-[hsl(220,70%,25%)] hover:bg-[hsl(220,70%,20%)] text-white w-full sm:w-auto"
            data-testid="button-download-badge"
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? 'Downloading...' : 'Download Badge'}
          </Button>

          <p className="text-gray-500 text-xs sm:text-sm text-center px-2">
            Share your badge on Instagram, Facebook, Twitter, or WhatsApp!
          </p>
        </div>
      </DialogContent>

      <div 
        ref={exportRef}
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <BadgeContent matches={matches} size="export" />
      </div>
    </Dialog>
  );
}
