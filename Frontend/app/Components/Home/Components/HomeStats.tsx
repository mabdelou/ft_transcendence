import '../Home.css'

export default function HomeStats() {
  return (

    <div className="py-8">
  <div className="bg-gradient-to-br from-yellow-400 to-red-500 rounded-lg shadow-md p-6 flex items-center space-x-4 transform transition-transform hover:scale-105 cursor-pointer">
    <div className="w-16 h-16 rounded-full overflow-hidden">
      <img src="/avatar.png" alt="Your Avatar" className="w-full h-full object-cover"/>
    </div>
    <div className="flex flex-col flex-1 space-y-2">
      <div className="text-white text-lg font-semibold">Your Username</div>
      <div className="flex items-center space-x-4">
        <div className="text-white text-sm">Total Games Played: 25</div>
        <div className="text-white text-sm">Wins: 18</div>
        <div className="text-white text-sm">Losses: 7</div>
      </div>
      <div className="text-white text-sm">Win Rate: 72%</div>
    </div>
    <div>
      <a href="#" className="bg-white text-pink-500 font-semibold py-2 px-4 rounded-lg inline-block">View Details</a>     </div>
  </div>
</div>

  );
}