import React, { useEffect, useState } from 'react';
import { api } from './lib/api';

const emptyChallenge = {
  challengeId: '',
  title: '',
  difficulty: 'Medium',
  category: '',
  link: '',
  description: '',
  isActive: false,
  status: 'Ready for Debugging',
};

const emptyQuestion = {
  questionId: '',
  title: '',
  difficulty: 'Medium',
  category: '',
  description: '',
  snippet: '',
  link: '',
};

const emptyEntry = {
  type: 'students',
  name: '',
  points: 0,
  solves: '',
  members: '',
};

const SectionTitle = ({ children }) => (
  <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">{children}</h2>
);

const Admin = () => {
  const [token, setToken] = useState(api.getAuthToken());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const [challenges, setChallenges] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [entries, setEntries] = useState([]);

  const [newChallenge, setNewChallenge] = useState(emptyChallenge);
  const [newQuestion, setNewQuestion] = useState(emptyQuestion);
  const [newEntry, setNewEntry] = useState(emptyEntry);

  const resetMessages = () => {
    setError('');
    setSuccess('');
  };

  const fetchOverview = async () => {
    setIsLoading(true);
    resetMessages();

    try {
      const data = await api.getAdminOverview();
      setChallenges(data.challenges || []);
      setQuestions(data.questions || []);
      setEntries(data.leaderboard || []);
    } catch (err) {
      const message = err.message || 'Failed to load admin data';
      setError(message);

      if (message.toLowerCase().includes('token')) {
        api.clearAuthToken();
        setToken('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchOverview();
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    resetMessages();

    try {
      const data = await api.loginAdmin(credentials);
      api.setAuthToken(data.token);
      setToken(data.token);
      setSuccess(`Logged in as ${data.user.username}`);
      setCredentials({ username: '', password: '' });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    api.clearAuthToken();
    setToken('');
    setChallenges([]);
    setQuestions([]);
    setEntries([]);
    resetMessages();
  };

  const updateListItem = (setter, list, id, key, value) => {
    setter(list.map((item) => (item._id === id ? { ...item, [key]: value } : item)));
  };

  const saveChallenge = async (item) => {
    resetMessages();
    try {
      await api.updateChallenge(item._id, {
        challengeId: item.challengeId,
        title: item.title,
        difficulty: item.difficulty,
        category: item.category,
        link: item.link,
        description: item.description,
        isActive: item.isActive,
        status: item.status,
      });
      setSuccess(`Saved challenge ${item.challengeId}`);
      await fetchOverview();
    } catch (err) {
      setError(err.message || 'Failed to save challenge');
    }
  };

  const addChallenge = async () => {
    resetMessages();
    try {
      await api.createChallenge(newChallenge);
      setNewChallenge(emptyChallenge);
      setSuccess('Challenge created');
      await fetchOverview();
    } catch (err) {
      setError(err.message || 'Failed to create challenge');
    }
  };

  const removeChallenge = async (id) => {
    resetMessages();
    try {
      await api.deleteChallenge(id);
      setSuccess('Challenge deleted');
      await fetchOverview();
    } catch (err) {
      setError(err.message || 'Failed to delete challenge');
    }
  };

  const saveQuestion = async (item) => {
    resetMessages();
    try {
      await api.updateQuestion(item._id, {
        questionId: item.questionId,
        title: item.title,
        difficulty: item.difficulty,
        category: item.category,
        description: item.description,
        snippet: item.snippet,
        link: item.link,
      });
      setSuccess(`Saved question ${item.questionId}`);
      await fetchOverview();
    } catch (err) {
      setError(err.message || 'Failed to save question');
    }
  };

  const addQuestion = async () => {
    resetMessages();
    try {
      await api.createQuestion(newQuestion);
      setNewQuestion(emptyQuestion);
      setSuccess('Question created');
      await fetchOverview();
    } catch (err) {
      setError(err.message || 'Failed to create question');
    }
  };

  const removeQuestion = async (id) => {
    resetMessages();
    try {
      await api.deleteQuestion(id);
      setSuccess('Question deleted');
      await fetchOverview();
    } catch (err) {
      setError(err.message || 'Failed to delete question');
    }
  };

  const saveEntry = async (item) => {
    resetMessages();
    try {
      await api.updateLeaderboardEntry(item._id, {
        type: item.type,
        name: item.name,
        points: Number(item.points),
        solves: item.solves,
        members: item.members,
      });
      setSuccess(`Saved leaderboard entry ${item.name}`);
      await fetchOverview();
    } catch (err) {
      setError(err.message || 'Failed to save leaderboard entry');
    }
  };

  const addEntry = async () => {
    resetMessages();
    try {
      await api.createLeaderboardEntry({
        ...newEntry,
        points: Number(newEntry.points),
      });
      setNewEntry(emptyEntry);
      setSuccess('Leaderboard entry created');
      await fetchOverview();
    } catch (err) {
      setError(err.message || 'Failed to create leaderboard entry');
    }
  };

  const removeEntry = async (id) => {
    resetMessages();
    try {
      await api.deleteLeaderboardEntry(id);
      setSuccess('Leaderboard entry deleted');
      await fetchOverview();
    } catch (err) {
      setError(err.message || 'Failed to delete leaderboard entry');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#070707] text-white px-6 py-28 font-sans">
        <div className="max-w-md mx-auto border border-white/10 rounded-2xl p-6 bg-white/[0.02]">
          <h1 className="text-2xl font-semibold mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              value={credentials.username}
              onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
              placeholder="Username"
              className="w-full bg-black border border-white/15 rounded-xl px-3 py-3"
            />
            <input
              value={credentials.password}
              onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
              placeholder="Password"
              type="password"
              className="w-full bg-black border border-white/15 rounded-xl px-3 py-3"
            />
            <button
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-white text-black font-semibold disabled:opacity-60"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
          <p className="mt-4 text-xs text-gray-500">Use credentials from server `.env` (`ADMIN_USERNAME`, `ADMIN_PASSWORD`).</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] text-white px-6 py-24 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Admin Panel</h1>
            <p className="text-gray-400 text-sm mt-2">Manage challenge, question, and leaderboard content.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchOverview} className="px-4 py-2 rounded-lg border border-white/20 text-sm">Refresh</button>
            <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold">Logout</button>
          </div>
        </div>

        {error && <div className="text-sm text-red-300 border border-red-500/30 rounded-lg px-4 py-3">{error}</div>}
        {success && <div className="text-sm text-emerald-300 border border-emerald-500/30 rounded-lg px-4 py-3">{success}</div>}
        {isLoading && <div className="text-sm text-gray-400">Loading data...</div>}

        <section className="space-y-4">
          <SectionTitle>Challenges</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <input placeholder="Challenge ID" value={newChallenge.challengeId} onChange={(e) => setNewChallenge((p) => ({ ...p, challengeId: e.target.value }))} className="bg-black border border-white/15 rounded-lg px-3 py-2" />
            <input placeholder="Title" value={newChallenge.title} onChange={(e) => setNewChallenge((p) => ({ ...p, title: e.target.value }))} className="bg-black border border-white/15 rounded-lg px-3 py-2" />
            <select value={newChallenge.difficulty} onChange={(e) => setNewChallenge((p) => ({ ...p, difficulty: e.target.value }))} className="bg-black border border-white/15 rounded-lg px-3 py-2">
              <option>Easy</option><option>Medium</option><option>Hard</option>
            </select>
            <input placeholder="Category" value={newChallenge.category} onChange={(e) => setNewChallenge((p) => ({ ...p, category: e.target.value }))} className="bg-black border border-white/15 rounded-lg px-3 py-2" />
            <input placeholder="LeetCode Link" value={newChallenge.link} onChange={(e) => setNewChallenge((p) => ({ ...p, link: e.target.value }))} className="bg-black border border-white/15 rounded-lg px-3 py-2 lg:col-span-2" />
            <textarea placeholder="Description" value={newChallenge.description} onChange={(e) => setNewChallenge((p) => ({ ...p, description: e.target.value }))} className="bg-black border border-white/15 rounded-lg px-3 py-2 lg:col-span-2 min-h-20" />
            <input placeholder="Status" value={newChallenge.status} onChange={(e) => setNewChallenge((p) => ({ ...p, status: e.target.value }))} className="bg-black border border-white/15 rounded-lg px-3 py-2" />
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" checked={newChallenge.isActive} onChange={(e) => setNewChallenge((p) => ({ ...p, isActive: e.target.checked }))} /> Set active
            </label>
          </div>
          <button onClick={addChallenge} className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm">Add Challenge</button>

          <div className="space-y-3">
            {challenges.map((item) => (
              <div key={item._id} className="border border-white/10 rounded-xl p-4 bg-white/[0.02] space-y-2">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                  <input value={item.challengeId} onChange={(e) => updateListItem(setChallenges, challenges, item._id, 'challengeId', e.target.value)} className="bg-black border border-white/15 rounded px-2 py-2" />
                  <input value={item.title} onChange={(e) => updateListItem(setChallenges, challenges, item._id, 'title', e.target.value)} className="bg-black border border-white/15 rounded px-2 py-2 lg:col-span-2" />
                  <select value={item.difficulty} onChange={(e) => updateListItem(setChallenges, challenges, item._id, 'difficulty', e.target.value)} className="bg-black border border-white/15 rounded px-2 py-2">
                    <option>Easy</option><option>Medium</option><option>Hard</option>
                  </select>
                  <input value={item.category} onChange={(e) => updateListItem(setChallenges, challenges, item._id, 'category', e.target.value)} className="bg-black border border-white/15 rounded px-2 py-2" />
                  <input value={item.link} onChange={(e) => updateListItem(setChallenges, challenges, item._id, 'link', e.target.value)} className="bg-black border border-white/15 rounded px-2 py-2 lg:col-span-2" />
                  <input value={item.status || ''} onChange={(e) => updateListItem(setChallenges, challenges, item._id, 'status', e.target.value)} className="bg-black border border-white/15 rounded px-2 py-2" />
                </div>
                <textarea value={item.description} onChange={(e) => updateListItem(setChallenges, challenges, item._id, 'description', e.target.value)} className="w-full min-h-20 bg-black border border-white/15 rounded px-2 py-2" />
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 text-xs text-gray-300">
                    <input type="checkbox" checked={Boolean(item.isActive)} onChange={(e) => updateListItem(setChallenges, challenges, item._id, 'isActive', e.target.checked)} /> Active
                  </label>
                  <button onClick={() => saveChallenge(item)} className="px-3 py-1.5 text-xs bg-white text-black rounded">Save</button>
                  <button onClick={() => removeChallenge(item._id)} className="px-3 py-1.5 text-xs border border-red-500/40 text-red-300 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SectionTitle>Questions</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <input placeholder="Question ID" value={newQuestion.questionId} onChange={(e) => setNewQuestion((p) => ({ ...p, questionId: e.target.value }))} className="bg-black border border-white/15 rounded-lg px-3 py-2" />
            <input placeholder="Title" value={newQuestion.title} onChange={(e) => setNewQuestion((p) => ({ ...p, title: e.target.value }))} className="bg-black border border-white/15 rounded-lg px-3 py-2" />
            <select value={newQuestion.difficulty} onChange={(e) => setNewQuestion((p) => ({ ...p, difficulty: e.target.value }))} className="bg-black border border-white/15 rounded-lg px-3 py-2">
              <option>Easy</option><option>Medium</option><option>Hard</option>
            </select>
            <input placeholder="Category" value={newQuestion.category} onChange={(e) => setNewQuestion((p) => ({ ...p, category: e.target.value }))} className="bg-black border border-white/15 rounded-lg px-3 py-2" />
            <textarea placeholder="Description" value={newQuestion.description} onChange={(e) => setNewQuestion((p) => ({ ...p, description: e.target.value }))} className="bg-black border border-white/15 rounded-lg px-3 py-2 min-h-20 lg:col-span-2" />
            <input placeholder="Snippet" value={newQuestion.snippet} onChange={(e) => setNewQuestion((p) => ({ ...p, snippet: e.target.value }))} className="bg-black border border-white/15 rounded-lg px-3 py-2 lg:col-span-2" />
            <input placeholder="LeetCode Link" value={newQuestion.link} onChange={(e) => setNewQuestion((p) => ({ ...p, link: e.target.value }))} className="bg-black border border-white/15 rounded-lg px-3 py-2 lg:col-span-2" />
          </div>
          <button onClick={addQuestion} className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm">Add Question</button>

          <div className="space-y-3">
            {questions.map((item) => (
              <div key={item._id} className="border border-white/10 rounded-xl p-4 bg-white/[0.02] space-y-2">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                  <input value={item.questionId} onChange={(e) => updateListItem(setQuestions, questions, item._id, 'questionId', e.target.value)} className="bg-black border border-white/15 rounded px-2 py-2" />
                  <input value={item.title} onChange={(e) => updateListItem(setQuestions, questions, item._id, 'title', e.target.value)} className="bg-black border border-white/15 rounded px-2 py-2 lg:col-span-2" />
                  <select value={item.difficulty} onChange={(e) => updateListItem(setQuestions, questions, item._id, 'difficulty', e.target.value)} className="bg-black border border-white/15 rounded px-2 py-2">
                    <option>Easy</option><option>Medium</option><option>Hard</option>
                  </select>
                  <input value={item.category} onChange={(e) => updateListItem(setQuestions, questions, item._id, 'category', e.target.value)} className="bg-black border border-white/15 rounded px-2 py-2" />
                  <input value={item.snippet} onChange={(e) => updateListItem(setQuestions, questions, item._id, 'snippet', e.target.value)} className="bg-black border border-white/15 rounded px-2 py-2 lg:col-span-3" />
                  <input value={item.link || ''} onChange={(e) => updateListItem(setQuestions, questions, item._id, 'link', e.target.value)} className="bg-black border border-white/15 rounded px-2 py-2 lg:col-span-4" />
                </div>
                <textarea value={item.description} onChange={(e) => updateListItem(setQuestions, questions, item._id, 'description', e.target.value)} className="w-full min-h-20 bg-black border border-white/15 rounded px-2 py-2" />
                <div className="flex gap-3">
                  <button onClick={() => saveQuestion(item)} className="px-3 py-1.5 text-xs bg-white text-black rounded">Save</button>
                  <button onClick={() => removeQuestion(item._id)} className="px-3 py-1.5 text-xs border border-red-500/40 text-red-300 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 pb-10">
          <SectionTitle>Leaderboard</SectionTitle>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <select value={newEntry.type} onChange={(e) => setNewEntry((p) => ({ ...p, type: e.target.value }))} className="bg-black border border-white/15 rounded-lg px-3 py-2">
              <option value="students">students</option>
              <option value="groups">groups</option>
            </select>
            <input
              placeholder={newEntry.type === 'students' ? 'Student Name' : 'Group Name'}
              value={newEntry.name}
              onChange={(e) => setNewEntry((p) => ({ ...p, name: e.target.value }))}
              className="bg-black border border-white/15 rounded-lg px-3 py-2 col-span-2"
            />
            <input
              type="number"
              placeholder={newEntry.type === 'students' ? 'Score (Points)' : 'Group Score (Total XP)'}
              value={newEntry.points}
              onChange={(e) => setNewEntry((p) => ({ ...p, points: e.target.value }))}
              className="bg-black border border-white/15 rounded-lg px-3 py-2"
            />
            {newEntry.type === 'students' ? (
              <>
                <input
                  type="number"
                  placeholder="Problems Solved"
                  value={newEntry.solves}
                  onChange={(e) => setNewEntry((p) => ({ ...p, solves: e.target.value }))}
                  className="bg-black border border-white/15 rounded-lg px-3 py-2"
                />
              </>
            ) : (
              <input
                type="number"
                placeholder="Active Members Count"
                value={newEntry.members}
                onChange={(e) => setNewEntry((p) => ({ ...p, members: e.target.value }))}
                className="bg-black border border-white/15 rounded-lg px-3 py-2"
              />
            )}
          </div>
          <button onClick={addEntry} className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm">Add Leaderboard Entry</button>

          <div className="space-y-3">
            {entries.map((item) => (
              <div key={item._id} className="border border-white/10 rounded-xl p-4 bg-white/[0.02]">
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
                  <select value={item.type} onChange={(e) => updateListItem(setEntries, entries, item._id, 'type', e.target.value)} className="bg-black border border-white/15 rounded px-2 py-2">
                    <option value="students">students</option>
                    <option value="groups">groups</option>
                  </select>
                  <input type="number" value={item.rank} disabled className="bg-black border border-white/15 rounded px-2 py-2 text-gray-400 cursor-not-allowed" />
                  <input
                    value={item.name}
                    placeholder={item.type === 'students' ? 'Student Name' : 'Group Name'}
                    onChange={(e) => updateListItem(setEntries, entries, item._id, 'name', e.target.value)}
                    className="bg-black border border-white/15 rounded px-2 py-2 col-span-2"
                  />
                  <input
                    type="number"
                    placeholder={item.type === 'students' ? 'Score (Points)' : 'Group Score (Total XP)'}
                    value={item.points}
                    onChange={(e) => updateListItem(setEntries, entries, item._id, 'points', e.target.value)}
                    className="bg-black border border-white/15 rounded px-2 py-2"
                  />
                  {item.type === 'students' ? (
                    <>
                      <input
                        type="number"
                        value={item.solves ?? ''}
                        placeholder="Problems Solved"
                        onChange={(e) => updateListItem(setEntries, entries, item._id, 'solves', e.target.value)}
                        className="bg-black border border-white/15 rounded px-2 py-2"
                      />
                    </>
                  ) : (
                    <input
                      type="number"
                      value={item.members ?? ''}
                      placeholder="Active Members Count"
                      onChange={(e) => updateListItem(setEntries, entries, item._id, 'members', e.target.value)}
                      className="bg-black border border-white/15 rounded px-2 py-2"
                    />
                  )}
                </div>
                <div className="flex gap-3 mt-3">
                  <button onClick={() => saveEntry(item)} className="px-3 py-1.5 text-xs bg-white text-black rounded">Save</button>
                  <button onClick={() => removeEntry(item._id)} className="px-3 py-1.5 text-xs border border-red-500/40 text-red-300 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
