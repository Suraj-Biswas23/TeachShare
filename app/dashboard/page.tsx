import { UserButton } from '@clerk/nextjs'
import Sidebar from '@/components/Sidebar'
import DashboardContent from '@/components/DashboardContent'

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm z-10 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-indigo-600">Dashboard</h1>
            <UserButton />
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <DashboardContent />
        </main>
      </div>
    </div>
  )
}