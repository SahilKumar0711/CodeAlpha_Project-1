let flashcards = [];
let currentCardIndex = 0;
let showingAnswer = false;

const cardText = document.getElementById('card-text');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const cardList = document.getElementById('card-list');

function renderCard() {
  if (flashcards.length === 0) {
    cardText.textContent = 'No flashcards available. Add one!';
    return;
  }

  const card = flashcards[currentCardIndex];
  cardText.textContent = showingAnswer ? card.answer : card.question;
}

function toggleCard() {
  if (flashcards.length === 0) return;
  showingAnswer = !showingAnswer;
  renderCard();
}

function nextCard() {
  if (flashcards.length === 0) return;
  currentCardIndex = (currentCardIndex + 1) % flashcards.length;
  showingAnswer = false;
  renderCard();
}

function prevCard() {
  if (flashcards.length === 0) return;
  currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
  showingAnswer = false;
  renderCard();
}

function addCard() {
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();

  if (!question || !answer) {
    alert("Both fields are required.");
    return;
  }

  flashcards.push({ question, answer });
  questionInput.value = '';
  answerInput.value = '';
  updateCardList();
  renderCard();
}

function deleteCard(index) {
  flashcards.splice(index, 1);
  if (currentCardIndex >= flashcards.length) {
    currentCardIndex = 0;
  }
  updateCardList();
  renderCard();
}

function editCard(index) {
  const newQuestion = prompt("Edit Question:", flashcards[index].question);
  const newAnswer = prompt("Edit Answer:", flashcards[index].answer);
  if (newQuestion && newAnswer) {
    flashcards[index].question = newQuestion;
    flashcards[index].answer = newAnswer;
    updateCardList();
    renderCard();
  }
}

function updateCardList() {
  cardList.innerHTML = "";
  flashcards.forEach((card, index) => {
    const li = document.createElement('li');
    li.textContent = card.question;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editCard(index);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteCard(index);

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    cardList.appendChild(li);
  });
}
