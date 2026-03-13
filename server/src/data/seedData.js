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

const defaultWinnerSvg = `
<svg width="720" height="840" viewBox="0 0 720 840" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="720" height="840" rx="48" fill="#09111F"/>
  <rect x="36" y="36" width="648" height="768" rx="36" fill="#101827"/>
  <circle cx="540" cy="162" r="126" fill="#2563EB" fill-opacity="0.22"/>
  <circle cx="164" cy="714" r="152" fill="#06B6D4" fill-opacity="0.18"/>
  <path d="M146 626C146 497.87 249.87 394 378 394C506.13 394 610 497.87 610 626V804H146V626Z" fill="#101827"/>
  <path d="M242 804C259.725 700.458 310.279 648.687 393.663 648.687C477.046 648.687 532.492 700.458 548 804H242Z" fill="#E5E7EB"/>
  <circle cx="388" cy="312" r="118" fill="#F4C7A1"/>
  <path d="M286 301C286 227.546 345.546 168 419 168H430C476.944 168 515 206.056 515 253V265C515 282.121 501.121 296 484 296H481C471.059 296 461.96 290.386 456.494 281.494L444 261L414.401 290.599C403.521 301.479 388.763 307.591 373.377 307.591H286V301Z" fill="#0F172A"/>
  <path d="M269 317C269 261.22 314.22 216 370 216H400C455.78 216 501 261.22 501 317V327H269V317Z" fill="#111827"/>
  <circle cx="335" cy="321" r="11" fill="#0F172A"/>
  <circle cx="440" cy="321" r="11" fill="#0F172A"/>
  <path d="M354 370C375.187 386.624 400.813 386.624 422 370" stroke="#9A3412" stroke-width="10" stroke-linecap="round"/>
  <g opacity="0.95">
    <circle cx="575" cy="610" r="72" fill="#111827"/>
    <path d="M575 556L592.634 591.729L632 597.451L603.5 625.229L610.228 664.451L575 645.929L539.772 664.451L546.5 625.229L518 597.451L557.366 591.729L575 556Z" fill="#FACC15"/>
  </g>
</svg>`;

export const competitionWinnerSeed = {
  name: 'Alex Rivera',
  imageData: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(defaultWinnerSvg)}`,
};

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
    videoLink: 'https://www.youtube.com/results?search_query=reverse+linked+list+leetcode+solution',
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
    videoLink: 'https://www.youtube.com/results?search_query=power+of+two+leetcode+solution',
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
    videoLink: 'https://www.youtube.com/results?search_query=design+memory+allocator+leetcode+solution',
  },
  {
    questionId: '04',
    title: 'Matrix Multiplication',
    difficulty: 'Medium',
    category: 'Algorithms',
    description: 'Optimize matrix multiplication for cache locality.',
    snippet: 'void multiply(int** A, int** B, int size);',
    link: 'https://leetcode.com/problems/sparse-matrix-multiplication/',
    videoLink: 'https://www.youtube.com/results?search_query=sparse+matrix+multiplication+leetcode+solution',
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
    videoLink: 'https://www.youtube.com/results?search_query=implement+trie+prefix+tree+leetcode+solution',
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
    videoLink: 'https://www.youtube.com/results?search_query=top+k+frequent+elements+leetcode+solution',
  },
  {
    questionId: '07',
    title: 'Cycle Detection in Graph',
    difficulty: 'Hard',
    category: 'Graph',
    description: 'Detect cycles in directed and undirected graphs efficiently.',
    snippet: 'bool hasCycle(int n, vector<vector<int>>& edges);',
    link: 'https://leetcode.com/problems/course-schedule/',
    videoLink: 'https://www.youtube.com/results?search_query=course+schedule+leetcode+solution',
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
