"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Award, CheckCircle, Clock, Code, ExternalLink, Star } from "lucide-react"
import { Doughnut, Bar } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js"

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

// Types for the API response
interface LeetCodeStats {
  username: string
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  ranking: number
  reputation: number
  starRating: number
}

interface CodeforcesUserInfo {
  username: string
  rating: number
  maxRating: number
  rank: string
  contribution: number
  friendOfCount: number
}

interface CodechefUserInfo {
  username: string
  rating: number
  maxRating: number
  rank: string
  country: string
  problemsSolved: number
}

interface CodeforcesSubmission {
  problemId: string
  problemName: string
  contestId: number
  rating: number | string
  tags: string[]
  submissionTime: string
}

interface CodeforcesSubmissions {
  totalSolved: number
  problemsByTags: Record<string, number>
  problemsByRating: Record<string, number>
  recentSolved: CodeforcesSubmission[]
}

interface ProblemStats {
  leetcode: LeetCodeStats
  codeforces: CodeforcesUserInfo & {
    submissions: CodeforcesSubmissions
  }
  codechef?: CodechefUserInfo
}

export default function ProblemSolvingStats({
  leetcodeUsername = "user1589T",
  codeforcesUsername = "ronykhan",
  codechefUsername = "ronycse8bu",
}: {
  leetcodeUsername?: string
  codeforcesUsername?: string
  codechefUsername?: string
}) {
  const [stats, setStats] = useState<ProblemStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)
        setError(null)

        // Use a default username if none is provided
        const leetcode = leetcodeUsername || "user1589T"
        const codeforces = codeforcesUsername || "ronykhan"
        const codechef = codechefUsername || "ronycse8bu"

        // Make sure usernames are properly encoded
        const encodedLeetcode = encodeURIComponent(leetcode)
        const encodedCodeforces = encodeURIComponent(codeforces)
        const encodedCodechef = encodeURIComponent(codechef)

        const response = await fetch(
          `/api/problem-stats?leetcode=${encodedLeetcode}&codeforces=${encodedCodeforces}&codechef=${encodedCodechef}`,
        )

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`API responded with status: ${response.status}. ${errorText}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setStats(data)
      } catch (err) {
        console.error("Error fetching problem stats:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch problem solving statistics")
        // Don't set stats to null here, keep any previous data
      } finally {
        setLoading(false)
      }
    }

    if (inView) {
      fetchStats()
    }
  }, [inView, leetcodeUsername, codeforcesUsername, codechefUsername])

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">API Error</h3>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <p className="text-gray-600 dark:text-gray-400">Showing mock data instead. This could be due to:</p>
          <ul className="list-disc text-left text-gray-600 dark:text-gray-400 mt-2 pl-6">
            <li>Invalid username</li>
            <li>API rate limiting</li>
            <li>Network connectivity issues</li>
            <li>API service disruption</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className="space-y-8">
      {loading ? (
        <LoadingState />
      ) : stats ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LeetCodeStatsCard stats={stats.leetcode} />
            <CodeforcesStatsCard stats={stats.codeforces} />
            {stats.codechef && <CodechefStatsCard stats={stats.codechef} />}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LeetCodeProblemDistribution stats={stats.leetcode} />
            <CodeforcesProblemTags stats={stats.codeforces.submissions} />
          </div>

          <RecentSubmissions submissions={stats.codeforces.submissions.recentSolved} />

          <div className="flex justify-center mt-8 px-4">
  <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 w-full max-w-md">
    <PlatformLink
      name="LeetCode"
      username={stats.leetcode.username}
      url={`https://leetcode.com/u/${stats.leetcode.username}/`}
      color="bg-yellow-500"
    />
    <PlatformLink
      name="Codeforces"
      username={stats.codeforces.username}
      url={`https://codeforces.com/profile/${stats.codeforces.username}`}
      color="bg-blue-500"
    />
    {stats.codechef && (
      <PlatformLink
        name="CodeChef"
        username={stats.codechef.username}
        url={`https://www.codechef.com/users/${stats.codechef.username}`}
        color="bg-green-500"
      />
    )}
  </div>
</div>

        </>
      ) : (
        <LoadingState />
      )}
    </div>
  )
}

function PlatformLink({ name, username, url, color }: { name: string; username: string; url: string; color: string }) {
  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`px-6 py-3 ${color} text-white rounded-lg font-medium flex items-center hover:opacity-90 transition shadow-md`}
    >
      Visit {name} <ExternalLink className="ml-2 h-4 w-4" />
    </motion.a>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">Loading problem solving statistics...</p>
    </div>
  )
}

function LeetCodeStatsCard({ stats }: { stats: LeetCodeStats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg flex items-center justify-center mr-3">
            <Code className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">LeetCode Stats</h3>
        </div>
        <a
          href={`https://leetcode.com/u/${stats.username}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 flex items-center hover:underline"
        >
          View Profile <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Solved</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.totalSolved}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Ranking</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.ranking.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Easy: {stats.easySolved}</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Medium: {stats.mediumSolved}</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Hard: {stats.hardSolved}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="text-sm text-gray-600 dark:text-gray-300">Rating: {stats.starRating}</span>
        </div>
        <div className="flex items-center">
          <Award className="h-4 w-4 text-purple-500 mr-1" />
          <span className="text-sm text-gray-600 dark:text-gray-300">Reputation: {stats.reputation}</span>
        </div>
      </div>
    </motion.div>
  )
}

function CodeforcesStatsCard({ stats }: { stats: CodeforcesUserInfo & { submissions: CodeforcesSubmissions } }) {
  // Determine rank color based on Codeforces rank
  const getRankColor = (rank: string) => {
    const rankLower = rank.toLowerCase()
    if (rankLower.includes("newbie")) return "text-gray-500"
    if (rankLower.includes("pupil")) return "text-green-500"
    if (rankLower.includes("specialist")) return "text-cyan-500"
    if (rankLower.includes("expert")) return "text-blue-500"
    if (rankLower.includes("candidate master")) return "text-purple-500"
    if (rankLower.includes("master")) return "text-orange-500"
    if (rankLower.includes("grandmaster")) return "text-red-500"
    if (rankLower.includes("legendary")) return "text-red-600"
    return "text-gray-500"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mr-3">
            <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Codeforces Stats</h3>
        </div>
        <a
          href={`https://codeforces.com/profile/${stats.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 flex items-center hover:underline"
        >
          View Profile <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Current Rating</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.rating}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Max: {stats.maxRating}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Problems Solved</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.submissions.totalSolved}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Rank</p>
          <p className={`text-lg font-semibold ${getRankColor(stats.rank)}`}>{stats.rank}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Contribution</p>
          <p className="text-lg font-semibold text-green-600 dark:text-green-400">+{stats.contribution}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Friends</p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{stats.friendOfCount}</p>
        </div>
      </div>
    </motion.div>
  )
}

function CodechefStatsCard({ stats }: { stats: CodechefUserInfo }) {
  // Determine rank color based on CodeChef rating
  const getRatingColor = (rating: number) => {
    if (rating < 1400) return "text-gray-500"
    if (rating < 1600) return "text-green-500"
    if (rating < 1800) return "text-blue-500"
    if (rating < 2000) return "text-purple-500"
    if (rating < 2200) return "text-orange-500"
    return "text-red-500"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mr-3">
            <Code className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">CodeChef Stats</h3>
        </div>
        <a
          href={`https://www.codechef.com/users/${stats.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 flex items-center hover:underline"
        >
          View Profile <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Current Rating</p>
          <p className={`text-2xl font-bold ${getRatingColor(stats.rating)}`}>{stats.rating}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Max: {stats.maxRating}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Problems Solved</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.problemsSolved}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Rank</p>
          <p className={`text-lg font-semibold ${getRatingColor(stats.rating)}`}>{stats.rank}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Country</p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{stats.country}</p>
        </div>
      </div>
    </motion.div>
  )
}

function LeetCodeProblemDistribution({ stats }: { stats: LeetCodeStats }) {
  const data = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [stats.easySolved, stats.mediumSolved, stats.hardSolved],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
        borderColor: ["#10B981", "#F59E0B", "#EF4444"],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: document.documentElement.classList.contains("dark") ? "#E5E7EB" : "#4B5563",
        },
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-gray-200">LeetCode Problem Distribution</h3>
      <div className="h-64 flex items-center justify-center">
        <Doughnut data={data} options={options} />
      </div>
    </motion.div>
  )
}

function CodeforcesProblemTags({ stats }: { stats: CodeforcesSubmissions }) {
  // Get top 8 tags
  const topTags = Object.entries(stats.problemsByTags)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)

  const data = {
    labels: topTags.map(([tag]) => tag),
    datasets: [
      {
        label: "Problems Solved",
        data: topTags.map(([, count]) => count),
        backgroundColor: [
          "rgba(139, 92, 246, 0.7)", // purple-500
          "rgba(59, 130, 246, 0.7)", // blue-500
          "rgba(16, 185, 129, 0.7)", // green-500
          "rgba(245, 158, 11, 0.7)", // yellow-500
          "rgba(239, 68, 68, 0.7)", // red-500
          "rgba(236, 72, 153, 0.7)", // pink-500
          "rgba(79, 70, 229, 0.7)", // indigo-500
          "rgba(6, 182, 212, 0.7)", // cyan-500
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: document.documentElement.classList.contains("dark") ? "#E5E7EB" : "#4B5563",
        },
        grid: {
          color: document.documentElement.classList.contains("dark")
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        ticks: {
          color: document.documentElement.classList.contains("dark") ? "#E5E7EB" : "#4B5563",
        },
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-gray-200">Codeforces Problem Tags</h3>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </motion.div>
  )
}

function RecentSubmissions({ submissions }: { submissions: CodeforcesSubmission[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-gray-200">Recent Submissions</h3>

      <div className="space-y-4">
        {submissions.map((submission,index) => (
          <div
          key={`${submission.problemId}-${index}`}
            className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="flex-shrink-0 mr-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-800 dark:text-gray-200">{submission.problemName}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap items-center gap-2">
                <span>Rating: {submission.rating}</span>
                <span>•</span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDate(submission.submissionTime)}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {submission.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {submission.tags.length > 3 && (
                  <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                    +{submission.tags.length - 3} more
                  </span>
                )}
              </div>
            </div>
            <a
              href={`https://codeforces.com/contest/${submission.contestId}/problem/${submission.problemId.replace(submission.contestId, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 p-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return "Today"
  } else if (diffDays === 1) {
    return "Yesterday"
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`
  } else {
    return date.toLocaleDateString()
  }
}
