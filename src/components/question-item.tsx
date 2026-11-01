import { Bot, Loader2, MessageSquare, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { dayjs } from '@/lib/dayjs'
import { cn } from '@/lib/utils'

interface Question {
  id: string
  question: string
  answer?: string | null
  createdAt: string
  likesCount: number
  likedByMe: boolean
  isGeneratingAnswer?: boolean
}

interface QuestionItemProps {
  question: Question
  onToggleLike: (liked: boolean) => void
}

export function QuestionItem({ question, onToggleLike }: QuestionItemProps) {
  const { isGeneratingAnswer } = question
  const hasAnswerSection = isGeneratingAnswer || !!question.answer

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          {/* Question */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="size-4 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <p className="mb-1 font-medium text-foreground">Pergunta</p>
              <p className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
                {question.question}
              </p>
            </div>
          </div>

          {hasAnswerSection && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="size-4 text-secondary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <p className="mb-1 font-medium text-foreground">
                  Resposta da IA
                </p>
                <div className="text-muted-foreground">
                  {isGeneratingAnswer ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="size-4 animate-spin text-primary" />
                      <span className="text-primary text-sm italic">
                        Gerando resposta...
                      </span>
                    </div>
                  ) : (
                    <p className="whitespace-pre-line text-sm leading-relaxed">
                      {question.answer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Button
              aria-pressed={question.likedByMe}
              className={cn(question.likedByMe && 'text-primary')}
              disabled={isGeneratingAnswer}
              onClick={() => onToggleLike(!question.likedByMe)}
              size="sm"
              variant="ghost"
            >
              <ThumbsUp
                className={cn('size-4', question.likedByMe && 'fill-current')}
              />
              {question.likesCount}
            </Button>
            <span className="text-muted-foreground text-xs">
              {dayjs(question.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
