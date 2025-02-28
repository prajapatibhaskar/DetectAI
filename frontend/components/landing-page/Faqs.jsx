import React from 'react'
import { AnimatedGradientText } from '../ui/animated-gradient-text'
import { cn } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const faqsList = [
  {
    question: "What is Detect AI?",
    answer: "Detect AI is a tool that helps identify whether a piece of text is AI-generated or human-written.",
  },
  {
    question: "How accurate is Detect AI?",
    answer: "Detect AI uses advanced models like SNN and BERT to ensure high accuracy in AI text detection.",
  },
  {
    question: "Is Detect AI free to use?",
    answer: "Yes! We offer a free plan with basic detection features, while the premium plan provides advanced analysis.",
  },
  {
    question: "Can Detect AI detect mixed AI and human-written content?",
    answer: "Yes, it can analyze hybrid content and highlight AI-generated sections.",
  },
  {
    question: "Do I need an account to use Detect AI?",
    answer: "No, you can use the free version without an account. However, creating an account unlocks additional features.",
  },
  {
    question: "How does Detect AI handle user data?",
    answer: "We prioritize privacy and do not store or share any text submitted for analysis.",
  },
];

const Question = ({question, answer}) => {
  return (
    <AccordionItem value={question}>
      <AccordionTrigger className="text-left">{question}</AccordionTrigger>
      <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
    </AccordionItem>

  );
}

const Faqs = () => {
  return (
    <section
          id="faqs"
          className="w-full flex flex-col items-center justify-center py-32 overflow-hidden px-6 xs:px-8 sm:px-0 sm:x-8 lg:mx-auto"
        >
          <AnimatedGradientText>
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              FAQs
            </span>
          </AnimatedGradientText>
    
          <h2 className="subHeading mt-4">
            Frequently Asked Questions
          </h2>
          <p className="subText mt-4 text-center">
          Here are some of the most frequently asked questions about our product.
          </p>

          <Accordion type='single' collapsible className='w-full max-w-4xl mx-auto mt-16'>
            {
              faqsList.map((faq) => {
                return <Question key={faq.question} {...faq}/>
              })
            }
          </Accordion>
      </section>
  )
}

export default Faqs