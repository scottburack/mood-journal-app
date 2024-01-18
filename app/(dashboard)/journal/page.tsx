import NewEntryCard from "@/components/NewEntryCard"
import EntryCard from "@/components/EntryCard"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link"
import { analyze } from "@/utils/ai"

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  // await analyze(`I'm going to give you a journal entry, I want you to analyze a few things. I need the mood,
  // a summary, what the subject is, and and color representing the mood. You need to respond back with formatted 
  // JSON like so: {"mood": "", "subject": "", "color": "", "negative": ""}.
  
  // Entry: 
  // Today was a realy great day. I finally was wable to gran that pair of shoes I always wanted.
  // `)

  return entries
}


const JournalPage = async () => {
  const entries = await getEntries()

   return (
    <div className='p-10 bg-zinc-400/10 h-full'>
      <h2 className='text-3xl mb-8'>Journal</h2>
      <div className='grid grid-cols-3 gap-4 p-10'>
        <NewEntryCard />
        {entries.map(entry => 
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard key={entry.id} entry={entry} />
          </Link>
        )}
      </div>
    </div>
   )
}

export default JournalPage