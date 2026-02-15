import { useState } from 'react'
import './InteractiveBrain.css'

// % left, top, width, height on the brain image
const REGION_HITBOX = {
  frontal: { left: 14, top: 25, width: 17, height: 36 },
  parietal: { left: 34, top: 7, width: 22, height: 22 },
  temporal: { left: 12, top: 51, width: 20, height: 32 },
  occipital: { left: 60, top: 22, width: 20, height: 36 },
  thalamus: { left: 42, top: 36, width: 9, height: 10 },
  hypothalamus: { left: 42, top: 46, width: 10, height: 5 },
  amygdala: { left: 30, top: 52, width: 11, height: 14 },
  hippocampus: { left: 44, top: 54, width: 13, height: 7 },
  cerebellum: { left: 56, top: 55, width: 24, height: 32 },
  brainstem: { left: 43, top: 63, width: 10, height: 32 },
}

const REGION_ID_TO_NAME = {
  frontal: 'Μετωπιαίος Λοβός',
  parietal: 'Βρεγματικός Λοβός',
  temporal: 'Κροταφικός Λοβός',
  occipital: 'Ινιακός Λοβός',
  hippocampus: 'Ιππόκαμπος',
  amygdala: 'Αμυγδαλή',
  thalamus: 'Θάλαμος',
  hypothalamus: 'Υποθάλαμος',
  cerebellum: 'Παρεγκεφαλίδα',
  brainstem: 'Εγκεφαλικό Στέλεχος',
}

const REGION_ID_TO_DESC = {
  frontal: 'Ο μετωπιαίος λοβός βοηθά στη σκέψη, στη λήψη αποφάσεων, στη συγκέντρωση και στον έλεγχο της συμπεριφοράς.',
  parietal: 'Ο βρεγματικός λοβός επεξεργάζεται την αίσθηση της αφής και βοηθά στον προσανατολισμό στο χώρο.',
  temporal: 'Ο κροταφικός λοβός σχετίζεται με την ακοή, τη μνήμη και την κατανόηση του λόγου.',
  occipital: 'Ο ινιακός λοβός είναι υπεύθυνος για την όραση και την επεξεργασία των εικόνων.',
  hippocampus: 'Ο ιππόκαμπος βοηθά στη δημιουργία και αποθήκευση νέων αναμνήσεων.',
  amygdala: 'Η αμυγδαλή παίζει σημαντικό ρόλο στα συναισθήματα, όπως ο φόβος, η χαρά και το άγχος.',
  thalamus: 'Ο θάλαμος λειτουργεί ως «σταθμός μεταφοράς» των αισθητηριακών πληροφοριών προς τα διάφορα μέρη του εγκεφάλου.',
  hypothalamus: 'Ο υποθάλαμος ρυθμίζει βασικές λειτουργίες του σώματος, όπως την πείνα, τη δίψα, τη θερμοκρασία και τον ύπνο.',
  cerebellum: 'Η παρεγκεφαλίδα συντονίζει τις κινήσεις και βοηθά στη διατήρηση της ισορροπίας.',
  brainstem: 'Το εγκεφαλικό στέλεχος ελέγχει βασικές λειτουργίες ζωής, όπως η αναπνοή και ο καρδιακός ρυθμός.',
}

const REGION_ID_TO_DAILY = {
  frontal: 'Όταν οργανώνεις το διάβασμά σου, παίρνεις αποφάσεις ή λύνεις προβλήματα, χρησιμοποιείς τον μετωπιαίο λοβό.',
  parietal: 'Όταν καταλαβαίνεις αν κάτι είναι ζεστό, κρύο ή τραχύ, ενεργοποιείται ο βρεγματικός λοβός.',
  temporal: 'Όταν ακούς μουσική, καταλαβαίνεις τι σου λένε ή θυμάσαι πληροφορίες, λειτουργεί αυτό το μέρος του εγκεφάλου.',
  occipital: 'Όταν διαβάζεις, βλέπεις εικόνες ή αναγνωρίζεις πρόσωπα, χρησιμοποιείς τον ινιακό λοβό.',
  hippocampus: 'Όταν θυμάσαι τι έμαθες στο μάθημα ή πού πήγες χθες, χρησιμοποιείς τον ιππόκαμπο.',
  amygdala: 'Όταν νιώθεις έντονα συναισθήματα ή αντιδράς σε μια επικίνδυνη κατάσταση, ενεργοποιείται η αμυγδαλή.',
  thalamus: 'Όταν βλέπεις, ακούς ή αγγίζεις κάτι, οι πληροφορίες περνούν πρώτα από τον θάλαμο.',
  hypothalamus: 'Όταν πεινάς, διψάς ή νιώθεις κόπωση, ο υποθάλαμος παίζει σημαντικό ρόλο.',
  cerebellum: 'Όταν περπατάς, τρέχεις ή κάνεις ποδήλατο, η παρεγκεφαλίδα λειτουργεί συνεχώς.',
  brainstem: 'Όταν αναπνέεις ή η καρδιά σου χτυπά χωρίς να το σκέφτεσαι, το εγκεφαλικό στέλεχος λειτουργεί αδιάκοπα.',
}

const REGION_ORDER = [
  'frontal', 'parietal', 'temporal', 'occipital',
  'hippocampus', 'amygdala', 'thalamus', 'hypothalamus',
  'cerebellum', 'brainstem',
]

export function InteractiveBrain({ regions }) {
  const [activeRegionId, setActiveRegionId] = useState(null)

  const regionMap = (regions || []).reduce((acc, r) => {
    const name = r.name ?? r.Name
    if (name) {
      acc[name] = {
        name,
        description: r.description ?? r.Description ?? '',
        dailyLife: r.dailyLife ?? r.DailyLife ?? '',
      }
    }
    return acc
  }, {})

  function getRegion(id) {
    const name = REGION_ID_TO_NAME[id]
    const fromApi = regionMap[name] ?? (regions || []).find((r) => (r.name ?? r.Name) === name)
    if (fromApi) {
      return {
        name: fromApi.name ?? name,
        description: fromApi.description ?? fromApi.Description ?? REGION_ID_TO_DESC[id],
        dailyLife: fromApi.dailyLife ?? fromApi.DailyLife ?? REGION_ID_TO_DAILY[id],
      }
    }
    return {
      name,
      description: REGION_ID_TO_DESC[id] ?? '',
      dailyLife: REGION_ID_TO_DAILY[id] ?? '',
    }
  }

  const activeRegion = activeRegionId ? getRegion(activeRegionId) : null

  return (
    <section className="interactive-brain" aria-label="Διαδραστικές περιοχές εγκεφάλου">
      <h2 className="brain-section-title">Περάστε το ποντίκι πάνω από μια περιοχή για να δείτε λεπτομέρειες</h2>
      <div className="brain-container">
        <div
          className="brain-image-wrap"
          onMouseLeave={() => setActiveRegionId(null)}
        >
          <img
            src="/brain-labeled.png"
            alt="Ανατομική απεικόνιση του εγκεφάλου με τις περιοχές σε ελληνικά"
            className="brain-labeled-image"
          />
          <div className="brain-regions-overlay" aria-hidden="true">
            {REGION_ORDER.map((id) => {
              const box = REGION_HITBOX[id]
              return (
                <div
                  key={id}
                  className={`brain-region-hitbox ${activeRegionId === id ? 'active' : ''}`}
                  style={{
                    left: `${box.left}%`,
                    top: `${box.top}%`,
                    width: `${box.width}%`,
                    height: `${box.height}%`,
                  }}
                  onMouseEnter={() => setActiveRegionId(id)}
                  title={REGION_ID_TO_NAME[id]}
                />
              )
            })}
          </div>
        </div>
        <div className={`brain-details-panel ${activeRegionId ? `brain-details-panel--${activeRegionId}` : ''}`.trim()}>
          {activeRegion ? (
            <>
              <h3 className="brain-details-title">🧠 {activeRegion.name ?? REGION_ID_TO_NAME[activeRegionId]}</h3>
              <p className="brain-details-label">Τι κάνει;</p>
              <p className="brain-details-desc">{activeRegion.description ?? REGION_ID_TO_DESC[activeRegionId]}</p>
              <p className="brain-details-label">Στην καθημερινή ζωή:</p>
              <p className="brain-details-daily">{activeRegion.dailyLife ?? REGION_ID_TO_DAILY[activeRegionId]}</p>
            </>
          ) : (
            <p className="brain-details-placeholder">Περάστε το ποντίκι πάνω από ένα τμήμα του εγκεφάλου για να δείτε το όνομά του και την περιγραφή του.</p>
          )}
        </div>
      </div>
    </section>
  )
}
