import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const superRole = await prisma.role.upsert({ where: { name: 'SUPER_ADMIN' }, update: {}, create: { name: 'SUPER_ADMIN', description: 'Full access' } })
  const opsRole = await prisma.role.upsert({ where: { name: 'CURE_OPS_ADMIN' }, update: {}, create: { name: 'CURE_OPS_ADMIN', description: 'Operations' } })
  await prisma.user.upsert({ where: { email: 'admin@briams.test' }, update: {}, create: { email: 'admin@briams.test', name: 'Super Admin', roleId: superRole.id } })

  // create some verification requests
  await prisma.verificationRequest.create({
    data: {
      providerType: 'DOCTOR',
      providerName: 'Dr. Kwame Mensah',
      providerEmail: 'kwame@curevirtual.test',
      documents: JSON.stringify([{ type: 'license', url: '/docs/dr-kwame-license.jpg' }]),
      status: 'PENDING'
    }
  })
  await prisma.verificationRequest.create({
    data: {
      providerType: 'PHARMACY',
      providerName: 'Sunrise Pharmacy',
      providerEmail: 'info@sunrisepharm.test',
      documents: JSON.stringify([{ type: 'permit', url: '/docs/sunrise-permit.jpg' }]),
      status: 'PENDING'
    }
  })

  await prisma.lead.create({ data: { name: 'Yaw Appiah', email: 'yaw@test.com', message: 'Need ERP', phone: '+233501234567', status: 'NEW' } })
  await prisma.lead.create({ data: { name: 'Esi Mensah', email: 'esi@test.com', message: 'Mobile app inquiry', phone: '+233244556677', status: 'CONTACTED' } })

  await prisma.caseStudy.create({ data: { title: 'Health Platform for Ghana', summary: 'Telehealth rollout', content: 'Detailed case study', published: true } })

  await prisma.transaction.create({ data: { externalId: 'tx_001', type: 'CONSULTATION', amount: 5000, currency: 'GHS', status: 'SUCCESS' } })
  await prisma.transaction.create({ data: { externalId: 'tx_002', type: 'PAYOUT', amount: 2000, currency: 'GHS', status: 'PENDING' } })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
