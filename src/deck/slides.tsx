import type { ReactNode } from 'react'
import TiltedCard from '@/components/TiltedCard'
import { bodySize, Eyebrow, Heading, Rise, Slide, Stagger } from '@/deck/Slide'

export type SlideDef = { label: string; notes: string; render: (reduce: boolean) => ReactNode }

const muted = 'muted text-cream/75'

/* Two option cards with tilt. Off-white cards on green keep contrast high. */
function Options({ reduce, items }: { reduce: boolean; items: { title: string; points: string[] }[] }) {
  return (
    <Stagger reduce={reduce} className="grid gap-5 md:grid-cols-2 md:gap-8">
      {items.map(item => (
        <Rise key={item.title} reduce={reduce}>
          <TiltedCard
            containerWidth="100%"
            containerHeight="clamp(9.5rem,32vh,18rem)"
            imageWidth="100%"
            imageHeight="100%"
            rotateAmplitude={reduce ? 0 : 7}
            scaleOnHover={reduce ? 1 : 1.02}
            glare={0}
            shadow={0}
            showTooltip={false}
            displayOverlayContent={false}
            intro={false}
          >
            <div className="h-full rounded-lg border border-gold/60 bg-cream p-[clamp(1.25rem,4vh,2.5rem)] text-left text-green">
              <h3 className="text-[clamp(1.75rem,min(5vh,6.5vw),3rem)]">{item.title}</h3>
              <ul className={`mt-[clamp(0.75rem,2.5vh,1.5rem)] flex flex-col gap-[clamp(0.4rem,1.4vh,0.9rem)] ${bodySize}`}>
                {item.points.map(p => (
                  <li key={p} className="flex gap-3 leading-snug">
                    <span className="mt-[0.6em] h-[0.4em] w-[0.4em] shrink-0 bg-gold" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </TiltedCard>
        </Rise>
      ))}
    </Stagger>
  )
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export const slides: SlideDef[] = [
  {
    label: 'Title',
    notes: 'Welcome everyone. This is not a lecture. In the next few minutes I will ask four questions and we will talk through each one. Your answers shape the club.',
    render: reduce => (
      <Slide>
        <div className="flex flex-col gap-[clamp(1rem,4vh,2.5rem)]">
          <Eyebrow>Interest meeting</Eyebrow>
          <h1 className="text-[clamp(3.5rem,min(16vh,13vw),10rem)] leading-[0.95]">Investment Club</h1>
          <Stagger reduce={reduce} delay={0.5}>
            <Rise reduce={reduce}>
              <div className="mb-[clamp(0.75rem,3vh,1.5rem)] h-1 w-24 bg-gold" />
              <p className={`${bodySize} ${muted} max-w-xl`}>Help us decide how our club runs.</p>
            </Rise>
          </Stagger>
        </div>
      </Slide>
    ),
  },
  {
    label: 'What is the club',
    notes: 'The club has three jobs. Learn how investing works. Practice together. Grow good habits. Keep it short here; the questions are the main event.',
    render: reduce => (
      <Slide>
        <Eyebrow>What is the club</Eyebrow>
        <Stagger reduce={reduce} className="flex flex-col">
          {[
            ['Learn', 'How money and markets really work.'],
            ['Practice', 'Try ideas together and talk them through.'],
            ['Grow', 'Build habits that last past graduation.'],
          ].map(([word, line]) => (
            <Rise key={word} reduce={reduce} className="flex flex-col gap-1 border-t border-gold/40 py-[clamp(0.6rem,2.4vh,1.5rem)] md:flex-row md:items-baseline md:gap-10">
              <h2 className="text-[clamp(2.5rem,min(10vh,12vw),6.5rem)] text-cream md:w-[45%]">{word}</h2>
              <p className={`${bodySize} ${muted}`}>{line}</p>
            </Rise>
          ))}
        </Stagger>
      </Slide>
    ),
  },
  {
    label: 'Four things we need',
    notes: 'Here is the plan. Four questions. After each one, take a quick show of hands or call out answers. I will write the counts down.',
    render: reduce => (
      <Slide>
        <Eyebrow>Your turn</Eyebrow>
        <Heading reduce={reduce}>The four things we need from you</Heading>
        <Stagger reduce={reduce} className="grid gap-x-12 gap-y-[clamp(0.5rem,2vh,1.25rem)] sm:grid-cols-2">
          {[
            'Long-term or short-term investing?',
            'Which day, and how often?',
            'Paper trading or real money?',
            'Field trips and outside activities?',
          ].map((q, i) => (
            <Rise key={q} reduce={reduce} className="flex items-baseline gap-5 border-t border-gold/40 pt-3">
              <span className="font-display text-[clamp(1.75rem,5vh,3rem)] tabular-nums text-gold">{i + 1}</span>
              <p className={`${bodySize} leading-snug`}>{q}</p>
            </Rise>
          ))}
        </Stagger>
      </Slide>
    ),
  },
  {
    label: 'Question 1',
    notes: 'Question 1. Do we want to hold for years, or trade over days and weeks? Ask for a show of hands for each. Invite one or two people to say why.',
    render: reduce => (
      <Slide>
        <Eyebrow>Question 1 of 4</Eyebrow>
        <Heading reduce={reduce}>Long-term or short-term investing?</Heading>
        <Options
          reduce={reduce}
          items={[
            { title: 'Long-term', points: ['Hold for years', 'Fewer trades, less stress', 'Time does the heavy lifting'] },
            { title: 'Short-term', points: ['Trade over days or weeks', 'More action, more risk', 'Needs more time and attention'] },
          ]}
        />
      </Slide>
    ),
  },
  {
    label: 'Question 2',
    notes: 'Question 2. Pick the day that works for most people, Monday to Friday. Then pick how often we meet. Count hands for each day and each rhythm.',
    render: reduce => (
      <Slide>
        <Eyebrow>Question 2 of 4</Eyebrow>
        <Heading reduce={reduce}>Which day, and how often?</Heading>
        <Stagger reduce={reduce} className="flex flex-col gap-[clamp(1rem,3.5vh,2rem)]">
          <Rise reduce={reduce}>
            <p className={`mb-3 ${muted} text-[clamp(0.9rem,2.2vh,1.15rem)] uppercase tracking-[0.18em]`}>Day</p>
            <div className="grid grid-cols-5 gap-[clamp(0.4rem,1.5vw,1.25rem)]">
              {days.map(d => (
                <div key={d} className="rounded-lg border border-gold/60 bg-cream py-[clamp(0.75rem,3.5vh,1.75rem)] text-center font-display text-[clamp(1.25rem,min(4.5vh,5vw),2.75rem)] text-green">
                  {d}
                </div>
              ))}
            </div>
          </Rise>
          <Rise reduce={reduce}>
            <p className={`mb-3 ${muted} text-[clamp(0.9rem,2.2vh,1.15rem)] uppercase tracking-[0.18em]`}>How often</p>
            <div className="grid gap-[clamp(0.4rem,1.5vw,1.25rem)] sm:grid-cols-3">
              {['Once a week', 'Twice a week', 'Every other week'].map(o => (
                <div key={o} className="rounded-lg border border-cream/40 px-5 py-[clamp(0.75rem,3vh,1.5rem)] text-center font-display text-[clamp(1.25rem,min(4vh,5vw),2.25rem)]">
                  {o}
                </div>
              ))}
            </div>
          </Rise>
        </Stagger>
      </Slide>
    ),
  },
  {
    label: 'Question 3',
    notes: 'Question 3. Paper trading uses pretend money at real prices. Real money means real gains and real losses. Take hands, then discuss what worries people.',
    render: reduce => (
      <Slide>
        <Eyebrow>Question 3 of 4</Eyebrow>
        <Heading reduce={reduce}>Paper trading or real money?</Heading>
        <Options
          reduce={reduce}
          items={[
            { title: 'Paper trading', points: ['Pretend money, real prices', 'No risk of losing cash', 'A safe place to learn first'] },
            { title: 'Real money', points: ['Real gains and real losses', 'Higher stakes, higher focus', 'Needs clear rules and setup'] },
          ]}
        />
      </Slide>
    ),
  },
  {
    label: 'Question 4',
    notes: 'Question 4. What would make you want to show up? Ask which of these sounds best, and ask for other ideas. Write the ideas down.',
    render: reduce => (
      <Slide>
        <Eyebrow>Question 4 of 4</Eyebrow>
        <Heading reduce={reduce}>Field trips and outside activities</Heading>
        <Stagger reduce={reduce} className="grid gap-[clamp(0.75rem,3vh,2rem)] md:grid-cols-3 md:gap-8">
          {[
            ['Guest speakers', 'Hear from people who work in finance.'],
            ['Company visits', 'See how a real business runs.'],
            ['Competitions', 'Test your picks against other schools.'],
          ].map(([t, d]) => (
            <Rise key={t} reduce={reduce} className="border-t-2 border-gold pt-4">
              <h3 className="text-[clamp(1.75rem,min(5vh,6.5vw),3rem)]">{t}</h3>
              <p className={`mt-2 ${bodySize} ${muted} leading-snug`}>{d}</p>
            </Rise>
          ))}
        </Stagger>
      </Slide>
    ),
  },
  {
    label: 'What happens next',
    notes: 'Thank everyone. I will count the votes and announce the first meeting day. Please sign up today so we can reach you. Then take questions.',
    render: reduce => (
      <Slide>
        <Eyebrow>Thank you</Eyebrow>
        <Heading reduce={reduce}>What happens next</Heading>
        <Stagger reduce={reduce} className="flex flex-col">
          {['Count the votes', 'Announce the first meeting day', 'Sign up today'].map((s, i) => (
            <Rise key={s} reduce={reduce} className="flex items-baseline gap-6 border-t border-gold/40 py-[clamp(0.6rem,2.4vh,1.5rem)]">
              <span className="font-display text-[clamp(1.75rem,5vh,3rem)] tabular-nums text-gold">{i + 1}</span>
              <p className="font-display text-[clamp(1.5rem,min(5.5vh,6.5vw),3.25rem)] leading-tight">{s}</p>
            </Rise>
          ))}
        </Stagger>
      </Slide>
    ),
  },
]




