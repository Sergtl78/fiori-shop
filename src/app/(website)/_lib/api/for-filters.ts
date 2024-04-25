import prisma from "@/lib/prisma"

export const getForFilters = async () => {
  const [vendors, colors] = await prisma.$transaction([prisma.vendor.findMany(), prisma.color.findMany()])
  return { vendors, colors }
}