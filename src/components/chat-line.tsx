import Balancer from 'react-wrap-balancer';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Message } from 'ai/react';
import ReactMarkdown from 'react-markdown';
import { formattedText } from '@/lib/utils';
import Image from 'next/image';
import Logo from '../../public/augusta.jpg';

const convertNewLines = (text: string) =>
  text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

interface ChatLineProps extends Partial<Message> {
  sources: string[];
}

export function ChatLine({
  role = 'assistant',
  content,
  sources,
}: ChatLineProps) {
  if (!content) {
    return null;
  }
  const formattedMessage = convertNewLines(content);

  return (
    <div>
      <Card className="mb-2">
        <CardHeader>
          <CardTitle
            className={
              role != 'assistant'
                ? 'text-[#0066ff] dark:text-[#0066ff]'
                : 'text-black dark:text-white'
            }
          >
            <div className="flex space-x-2 items-center">
              {role == 'assistant' && (
                <Image
                  alt="logo"
                  src={Logo}
                  width={30}
                  className="rounded-full"
                />
              )}
              <p>{role == 'assistant' ? 'AugustaGPT' : 'You'}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <Balancer className="dark:text-white text-black">
            {formattedMessage}
          </Balancer>
        </CardContent>
        <CardFooter>
          <CardDescription className="w-full">
            {sources && sources.length ? (
              <Accordion type="single" collapsible className="w-full">
                {sources.map((source, index) => (
                  <AccordionItem value={`source-${index}`} key={index}>
                    <AccordionTrigger>{`Source ${index + 1}`}</AccordionTrigger>
                    <AccordionContent>
                      <ReactMarkdown linkTarget="_blank">
                        {formattedText(source)}
                      </ReactMarkdown>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <></>
            )}
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
