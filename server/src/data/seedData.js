export const challengeSeed = [
  {
    challengeId: 'CH-256',
    title: 'LRU Cache Implementation',
    difficulty: 'Hard',
    category: 'System Design',
    link: 'https://leetcode.com/problems/lru-cache/',
    description:
      'Design and implement a data structure for Least Recently Used (LRU) cache with O(1) operations.',
    isActive: true,
    status: 'Ready for Debugging',
  },
];

export const questionSeed = [
  {
    questionId: '01',
    title: 'Reverse a Linked List',
    difficulty: 'Medium',
    category: 'Pointers',
    description:
      'Implement an in-place reversal of a singly linked list without using extra memory.',
    snippet: 'struct Node* reverse(struct Node* head);',
    link: 'https://leetcode.com/problems/reverse-linked-list/',
  },
  {
    questionId: '02',
    title: 'Bitwise Power of Two',
    difficulty: 'Easy',
    category: 'Logic',
    description:
      'Determine if an integer is a power of two using bitwise operators in O(1).',
    snippet: 'bool isPowerOfTwo(int n);',
    link: 'https://leetcode.com/problems/power-of-two/',
  },
  {
    questionId: '03',
    title: 'Custom Malloc Implementation',
    difficulty: 'Hard',
    category: 'Memory',
    description:
      'Design a simple memory allocator using sbrk() or mmap() system calls.',
    snippet: 'void* my_malloc(size_t size);',
    link: 'https://leetcode.com/problems/design-memory-allocator/',
  },
  {
    questionId: '04',
    title: 'Matrix Multiplication',
    difficulty: 'Medium',
    category: 'Algorithms',
    description: 'Optimize matrix multiplication for cache locality.',
    snippet: 'void multiply(int** A, int** B, int size);',
    link: 'https://leetcode.com/problems/sparse-matrix-multiplication/',
  },
  {
    questionId: '05',
    title: 'Trie Prefix Search',
    difficulty: 'Medium',
    category: 'Data Structures',
    description:
      'Build a Trie to support fast insertions and prefix lookups.',
    snippet: 'bool startsWith(const string& prefix);',
    link: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
  },
  {
    questionId: '06',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    category: 'Heap',
    description:
      'Return the k most frequent elements using a min-heap or bucket approach.',
    snippet: 'vector<int> topKFrequent(vector<int>& nums, int k);',
    link: 'https://leetcode.com/problems/top-k-frequent-elements/',
  },
  {
    questionId: '07',
    title: 'Cycle Detection in Graph',
    difficulty: 'Hard',
    category: 'Graph',
    description: 'Detect cycles in directed and undirected graphs efficiently.',
    snippet: 'bool hasCycle(int n, vector<vector<int>>& edges);',
    link: 'https://leetcode.com/problems/course-schedule/',
  },
];

export const leaderboardSeed = [
  { type: 'students', rank: 1, name: 'Alex Rivera', points: 2850, solves: 142 },
  { type: 'students', rank: 2, name: 'Sarah Chen', points: 2720, solves: 138 },
  { type: 'students', rank: 3, name: 'Jordan Smit', points: 2600, solves: 120 },
  { type: 'students', rank: 4, name: 'Priya Das', points: 2450, solves: 115 },
  { type: 'students', rank: 5, name: 'Marcus Lee', points: 2300, solves: 110 },
  { type: 'students', rank: 6, name: 'Elena Rodriguez', points: 2100, solves: 98 },
  { type: 'students', rank: 7, name: 'Sam Wilson', points: 1950, solves: 85 },
  { type: 'groups', rank: 1, name: 'Neural Knights', points: 12400, members: 5 },
  { type: 'groups', rank: 2, name: 'Binary Beasts', points: 11200, members: 4 },
  { type: 'groups', rank: 3, name: 'Logic Lords', points: 9800, members: 6 },
  { type: 'groups', rank: 4, name: 'Code Crusaders', points: 8900, members: 4 },
  { type: 'groups', rank: 5, name: 'Dev Dynamos', points: 7600, members: 5 },
  { type: 'groups', rank: 6, name: 'Stack Stars', points: 5400, members: 3 },
];
