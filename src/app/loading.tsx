export default function Loading() {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      <p className="animate-pulse text-lg font-medium text-gray-600">
        Loading... ⏳
      </p>
    </div>
  )
}
