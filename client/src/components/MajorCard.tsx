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
      isTopMatch ? 'ring-4 ring-indigo-500 shadow-xl' : ''
    }`}>
      <CardContent className="p-6 text-center">
        {isTopMatch && (
          <Badge className="bg-indigo-600 text-white text-sm font-bold mb-4">
            BEST MATCH
          </Badge>
        )}
        {rank && !isTopMatch && (
          <Badge variant="outline" className="mb-4">
            #{rank}
          </Badge>
        )}
        
        <div className="text-5xl mb-4">{major.icon}</div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {major.name}
        </h3>
        
        <p className="text-sm text-indigo-600 font-medium mb-4">
          {major.college}
        </p>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {major.description}
        </p>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm">
            Career Opportunities:
          </h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {major.careers.slice(0, 3).map((career, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {career}
              </Badge>
            ))}
            {major.careers.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{major.careers.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {reasons.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">
              Why this fits you:
            </h4>
            <ul className="text-xs text-gray-600 text-left space-y-1">
              {reasons.slice(0, 2).map((reason, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Match</span>
            <span className="text-sm font-bold text-indigo-600">
              {matchPercentage}%
            </span>
          </div>
          <Progress 
            value={matchPercentage} 
            className="h-2"
          />
        </div>
        
        <Button
          asChild
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          <a href={major.url} target="_blank" rel="noopener noreferrer">
            Learn More
            <i className="fas fa-external-link-alt ml-2 text-xs"></i>
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
