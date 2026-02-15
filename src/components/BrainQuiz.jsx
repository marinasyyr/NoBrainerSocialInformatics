import { useState } from 'react'
import './BrainQuiz.css'

const QUESTIONS = [
  {
    question: 'Τι λειτουργία έχει κυρίως ο μετωπικός λοβός;',
    options: [
      'Οπτική επεξεργασία',
      'Λογική, σχεδιασμός, κίνηση και συναισθήματα',
      'Ακουστική επεξεργασία',
      'Ελέγχει την αναπνοή',
    ],
    correctIndex: 1,
  },
  {
    question: 'Πού επεξεργάζονται οι οπτικές πληροφορίες στον εγκέφαλο;',
    options: [
      'Στον κροταφικό λοβό',
      'Στην παρεγκεφαλίδα',
      'Στον ινιακό λοβό',
      'Στο εγκεφαλικό στέλεχος',
    ],
    correctIndex: 2,
  },
  {
    question: 'Τι συντονίζει η παρεγκεφαλίδα;',
    options: [
      'Τη μνήμη και τη γλώσσα',
      'Οπτική και ακουστική αντίληψη',
      'Εκούσιες κινήσεις, ισορροπία και στάση σώματος',
      'Συναισθήματα και λογική',
    ],
    correctIndex: 2,
  },
  {
    question: 'Περίπου πόσα δισεκατομμύρια νευρώνες έχει ο ανθρώπινος εγκέφαλος;',
    options: ['Περίπου 10', 'Περίπου 86', 'Περίπου 200', 'Περίπου 50'],
    correctIndex: 1,
  },
  {
    question: 'Τι ελέγχει κυρίως το εγκεφαλικό στέλεχος;',
    options: [
      'Τη μνήμη',
      'Την αναπνοή, τον καρδιακό ρυθμό και άλλες ζωτικές λειτουργίες',
      'Την οπτική αντίληψη',
      'Τη λογική και τον σχεδιασμό',
    ],
    correctIndex: 1,
  },
  {
    question: 'Ποιος λοβός σχετίζεται με την ακουστική επεξεργασία και τον ιππόκαμπο (μνήμη);',
    options: ['Μετωπικός', 'Βρεγματικός', 'Κροταφικός', 'Ινιακός'],
    correctIndex: 2,
  },
  {
    question: 'Τι ποσοστό της ενέργειας του σώματος καταναλώνει κατά μέσο όρο ο εγκέφαλος;',
    options: ['Περίπου 5%', 'Περίπου 20%', 'Περίπου 35%', 'Περίπου 50%'],
    correctIndex: 1,
  },
  {
    question: 'Ποιος λοβός επεξεργάζεται την αφή, τη θερμοκρασία και τη χωρική αντίληψη;',
    options: ['Ινιακός', 'Μετωπικός', 'Βρεγματικός', 'Κροταφικός'],
    correctIndex: 2,
  },
  {
    question: 'Τι ονομάζουμε νευροπλαστικότητα;',
    options: [
      'Την ικανότητα του εγκεφάλου να αναδιοργανώνεται και να σχηματίζει νέες συνδέσεις',
      'Την ακουστική επεξεργασία',
      'Τη ρύθμιση του καρδιακού ρυθμού',
      'Την οπτική αντίληψη',
    ],
    correctIndex: 0,
  },
  {
    question: 'Μέσω τι επικοινωνούν οι νευρώνες μεταξύ τους;',
    options: [
      'Μόνο μέσω ηλεκτρικών σημάτων',
      'Μέσω ηλεκτρικών και χημικών σημάτων στα συνάψεις',
      'Μόνο μέσω χημικών σημάτων',
      'Δεν επικοινωνούν απευθείας',
    ],
    correctIndex: 1,
  },
]

export function BrainQuiz({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const question = QUESTIONS[currentIndex]
  const isLastQuestion = currentIndex === QUESTIONS.length - 1

  function handleAnswer(optionIndex) {
    if (showFeedback) return
    setSelectedIndex(optionIndex)
    const correct = optionIndex === question.correctIndex
    setIsCorrect(correct)
    if (correct) setScore((s) => s + 1)
    setShowFeedback(true)
  }

  function handleNext() {
    if (!showFeedback) return
    if (isLastQuestion) {
      setShowResults(true)
      return
    }
    setSelectedIndex(null)
    setShowFeedback(false)
    setCurrentIndex((i) => i + 1)
  }

  const finished = showResults

  return (
    <section className="brain-quiz">
      <div className="brain-quiz-header">
        <button type="button" className="brain-quiz-back" onClick={onBack}>
          ← Επιστροφή
        </button>
        <span className="brain-quiz-progress">
          Ερώτηση {currentIndex + 1} / {QUESTIONS.length}
        </span>
      </div>

      {!finished ? (
        <>
          <h2 className="brain-quiz-title">Κουίζ εγκεφάλου</h2>
          <p className="brain-quiz-question">{question.question}</p>
          <ul className="brain-quiz-options" role="listbox" aria-label="Επιλογές απάντησης">
            {question.options.map((opt, i) => {
              let optClass = 'brain-quiz-option'
              if (showFeedback) {
                if (i === question.correctIndex) optClass += ' correct'
                else if (i === selectedIndex && !isCorrect) optClass += ' wrong'
              }
              return (
                <li key={i}>
                  <button
                    type="button"
                    className={optClass}
                    onClick={() => handleAnswer(i)}
                    disabled={showFeedback}
                    role="option"
                    aria-pressed={selectedIndex === i}
                  >
                    {opt}
                  </button>
                </li>
              )
            })}
          </ul>

          {showFeedback && (
            <div className={`brain-quiz-feedback ${isCorrect ? 'correct' : 'wrong'}`}>
              {isCorrect ? (
                <p className="brain-quiz-feedback-text">Σωστά!</p>
              ) : (
                <>
                  <p className="brain-quiz-feedback-text">Λάθος.</p>
                  <p className="brain-quiz-correct-answer">
                    Η σωστή απάντηση είναι: <strong>{question.options[question.correctIndex]}</strong>
                  </p>
                </>
              )}
              <button type="button" className="brain-quiz-next" onClick={handleNext}>
                {isLastQuestion ? 'Δες το αποτέλεσμα' : 'Επόμενη ερώτηση'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="brain-quiz-results">
          <h2 className="brain-quiz-results-title">Τέλος κουίζ</h2>
          <p className="brain-quiz-results-score">
            Σκορ: <strong>{score}</strong> / {QUESTIONS.length}
          </p>
          <p className="brain-quiz-results-message">
            {score === QUESTIONS.length
              ? 'Τα πήγες τέλεια!'
              : score >= QUESTIONS.length / 2
                ? 'Καλή δουλειά! Συνεχίστε να μαθαίνετε.'
                : 'Δοκιμάστε ξανά αφού ξαναδείτε τις περιοχές του εγκεφάλου.'}
          </p>
          <button type="button" className="brain-quiz-back-home" onClick={onBack}>
            Επιστροφή στην αρχική
          </button>
        </div>
      )}
    </section>
  )
}
