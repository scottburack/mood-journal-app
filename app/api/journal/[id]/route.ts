import { analyze } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const PATCH = async (request, {params}) => {
  const { content } = await request.json()
  const user = await getUserByClerkId()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id  // What ever we call the folder is what the property on params is call. In this case it is [id]
      }
    },
    data: {
      content
    }
  })

  const analysis = await analyze(updatedEntry.content)


  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      entryId: updatedEntry.id,
      ...analysis
    },
    update: analysis
  })

  console.log(updated)

  return NextResponse.json({ data: updatedEntry })
}