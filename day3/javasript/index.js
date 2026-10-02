let notes = [
{ id: 1, text: "Buy milk and bread", category: "personal" },
{ id: 2, text: "Finish the Day 3 assignment", category: "study" },
{ id: 3, text: "Email the project report to Grace", category: "work" },
{ id: 4, text: "Revise JavaScript arrays", category: "study" },
{ id: 5, text: "Call mum", category: "personal" },
];

// Helper: trims, collapses extra spaces and lowercases text
function normalize(text) {
return text.trim().replace(/\s+/g, " ").toLowerCase();
}

// 1. searchNotes: notes whose text contains word, ignoring case
function searchNotes(word) {
return notes.filter(function (note) {
return note.text.toLowerCase().includes(word.toLowerCase());
});
}

// 2. longestNote: note with the most characters, or null if none
function longestNote() {
if (notes.length === 0) {
return null;
}
let longest = notes[0];
for (let i = 1; i < notes.length; i++) {
if (notes[i].text.length > longest.text.length) {
longest = notes[i];
}
}
return longest;
}

// 3. countByCategory: counts notes per category
function countByCategory() {
let counts = { personal: 0, work: 0, study: 0 };
for (let i = 0; i < notes.length; i++) {
counts[notes[i].category]++;
}
return counts;
}

// 4. getSummary: sentence summarising the notes
function getSummary() {
let counts = countByCategory();
let word = notes.length === 1 ? "note" : "notes";
return `${notes.length} ${word}: ${counts.personal} personal, ${counts.work} work, ${counts.study} study.`;
}

// 5. isDuplicate: true if same text exists (ignoring case and extra spaces)
function isDuplicate(text) {
return notes.some(function (note) {
return normalize(note.text) === normalize(text);
});
}

// 6. addNote: adds a valid, non-duplicate note
function addNote(text, category) {
let cleaned = text.trim().replace(/\s+/g, " ");

if (cleaned.length < 1 || cleaned.length > 200) {
console.log("Not added: text must be between 1 and 200 characters.");
return false;
}
if (isDuplicate(cleaned)) {
console.log("Not added: this note already exists.");
return false;
}
if (category !== "personal" && category !== "work" && category !== "study") {
console.log("Not added: category must be personal, work or study.");
return false;
}

let nextId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;
notes.push({ id: nextId, text: cleaned, category: category });
console.log("Added: " + cleaned);
return true;
}

// ---------- TESTS ----------

// searchNotes
console.log(searchNotes("JAVASCRIPT"));
// Expected: [ { id: 4, text: "Revise JavaScript arrays", category: "study" } ]
console.log(searchNotes("zebra"));
// Expected: [] (edge case: no results)

// longestNote
console.log(longestNote());
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }
let backup = notes;
notes = [];
console.log(longestNote());
// Expected: null (edge case: no notes)
notes = backup;

// countByCategory
console.log(countByCategory());
// Expected: { personal: 2, work: 1, study: 2 }
notes = [];
console.log(countByCategory());
// Expected: { personal: 0, work: 0, study: 0 } (edge case: no notes)
notes = backup;

// getSummary
console.log(getSummary());
// Expected: "5 notes: 2 personal, 1 work, 2 study."
notes = [backup[0]];
console.log(getSummary());
// Expected: "1 note: 1 personal, 0 work, 0 study." (edge case: exactly one note)
notes = backup;

// isDuplicate
console.log(isDuplicate(" call MUM "));
// Expected: true (ignores case and extra spaces)
console.log(isDuplicate("Walk the dog"));
// Expected: false

// addNote
console.log(addNote("Walk the dog", "personal"));
// Expected: "Added: Walk the dog" then true
console.log(addNote("walk the dog", "personal"));
// Expected: "Not added: this note already exists." then false
console.log(addNote("", "work"));
// Expected: "Not added: text must be between 1 and 200 characters." then false
console.log(addNote("Plan the sprint", "fun"));
// Expected: "Not added: category must be personal, work or study." then false
console.log(addNote("a".repeat(201), "work"));
// Expected: "Not added: text must be between 1 and 200 characters." then false
console.log(getSummary());
// Expected: "6 notes: 3 personal, 1 work, 2 study."

