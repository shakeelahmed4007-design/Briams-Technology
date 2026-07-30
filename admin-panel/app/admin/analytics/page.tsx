import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getMetrics() {
  const totalPatients = await prisma.user.count()
  const verifiedProviders = await prisma.verificationRequest.count({ where: { status: 'APPROVED' } })
  const activeConsultations = 3
  const revenue = await prisma.transaction.aggregate({ _sum: { amount: true } })
  return { totalPatients, verifiedProviders, activeConsultations, revenue: revenue._sum.amount || 0 }
}

export default async function AnalyticsPage() {
  const m = await getMetrics()
  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Analytics & Financials</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">Total Patients<div className="text-2xl font-bold">{m.totalPatients}</div></div>
        <div className="bg-white p-4 rounded shadow">Verified Providers<div className="text-2xl font-bold">{m.verifiedProviders}</div></div>
        <div className="bg-white p-4 rounded shadow">Active Consultations<div className="text-2xl font-bold">{m.activeConsultations}</div></div>
        <div className="bg-white p-4 rounded shadow">Revenue<div className="text-2xl font-bold">GHS {m.revenue}</div></div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Recent Transactions</h2>
        <RecentTransactions />
      </div>
    </div>
  )
}

async function RecentTransactions() {
  const tx = await prisma.transaction.findMany({ orderBy: { createdAt: 'desc' }, take: 10 })
  return (
    <table className="min-w-full">
      <thead className="text-xs text-gray-500">
        <tr><th>Type</th><th>Amount</th><th>Status</th><th>Date</th></tr>
      </thead>
      <tbody>
        {tx.map((t) => (
          <tr key={t.id} className="border-t">
            <td className="px-2 py-2">{t.type}</td>
            <td className="px-2 py-2">GHS {t.amount}</td>
            <td className="px-2 py-2">{t.status}</td>
            <td className="px-2 py-2">{t.createdAt.toISOString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
