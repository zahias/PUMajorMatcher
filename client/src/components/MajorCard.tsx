import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { MajorMatch } from "@/lib/matchingAlgorithm";

interface MajorCardProps {
  match: MajorMatch;
  rank?: number;
  isTopMatch?: boolean;
}

export default function MajorCard({ match, rank, isTopMatch = false }: MajorCardProps) {
  const { major, matchPercentage, reasons } = match;

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${
      isTopMatch ? 'ring-4 ring-[hsl(220,70%,35%)] shadow-xl' : ''
    }`} data-testid={`card-major-${match.major.key}`}>
      <CardContent className="p-4 sm:p-6 text-center">
        {isTopMatch && (
          <Badge className="bg-[hsl(220,70%,25%)] text-white text-xs sm:text-sm font-bold mb-3 sm:mb-4">
            BEST MATCH
          </Badge>
        )}
        {rank && !isTopMatch && (
          <Badge variant="outline" className="mb-3 sm:mb-4 text-xs sm:text-sm">
            #{rank}
          </Badge>
        )}
        
        <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{major.icon}</div>
        
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">
          {major.name}
        </h3>
        
        <p className="text-xs sm:text-sm text-[hsl(220,70%,35%)] font-medium mb-3 sm:mb-4">
          {major.college}
        </p>
        
        <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed line-clamp-3">
          {major.description}
        </p>
        
        <div className="mb-3 sm:mb-4">
          <h4 className="font-semibold text-gray-800 mb-2 text-xs sm:text-sm">
            Career Opportunities:
          </h4>
          <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
            {major.careers.slice(0, 3).map((career, index) => (
              <Badge key={index} variant="secondary" className="text-[10px] sm:text-xs">
                {career}
              </Badge>
            ))}
            {major.careers.length > 3 && (
              <Badge variant="secondary" className="text-[10px] sm:text-xs">
                +{major.careers.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {reasons.length > 0 && (
          <div className="mb-3 sm:mb-4">
            <h4 className="font-semibold text-gray-800 mb-2 text-xs sm:text-sm">
              Why this fits you:
            </h4>
            <ul className="text-[10px] sm:text-xs text-gray-600 text-left space-y-1">
              {reasons.slice(0, 2).map((reason, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[hsl(220,70%,35%)] mr-1 sm:mr-2">•</span>
                  <span className="line-clamp-2">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mb-3 sm:mb-4">
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-700">Match</span>
            <span className="text-xs sm:text-sm font-bold text-[hsl(220,70%,35%)]">
              {matchPercentage}%
            </span>
          </div>
          <Progress 
            value={matchPercentage} 
            className="h-1.5 sm:h-2"
          />
        </div>
        
        <Button
          asChild
          className="w-full bg-[hsl(220,70%,25%)] hover:bg-[hsl(220,70%,20%)] text-xs sm:text-sm py-2 sm:py-2.5"
        >
          <a href={major.url} target="_blank" rel="noopener noreferrer" data-testid={`link-learn-more-${major.key}`}>
            Learn More →
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
