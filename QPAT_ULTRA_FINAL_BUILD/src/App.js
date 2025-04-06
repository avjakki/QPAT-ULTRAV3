// QPAT ULTRA – Emergency Triage Intelligence System (App.js Full)
// Clinical-grade React application with grouped inputs, smart logic, ESI scoring, and nurse-ready summary

import React, { useState } from "react";

export default function App() {
  const [form, setForm] = useState({
    name: "", age: "", location: "",
    complaint: "", onset: "", symptoms: "", painLevel: "",
    history: "", familyHistory: "", medications: "", allergiesList: "",
    arrivalMethod: "", visitHistory: "", guardianName: "", emergencyContact: "",
    chestPain: "", breathingIssue: "", confusion: "", unconscious: "", worsening: "",
    bleeding: "", trauma: "", vomiting: "", dizziness: "", fever: "", painRadiates: "",
    pediatric: "", accessibility: "", communication: "", mentalStatus: "", disabilities: "",
    allergies: "", onMeds: "", hasDevices: ""
  });

  const [result, setResult] = useState(null);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const renderRadio = (name, label) => (
    <div className="mb-3">
      <p className="font-semibold">{label}</p>
      <label><input type="radio" name={name} value="yes" checked={form[name] === "yes"} onChange={handleChange} className="mr-2" /> Yes</label>
      <label className="ml-4"><input type="radio" name={name} value="no" checked={form[name] === "no"} onChange={handleChange} className="mr-2" /> No</label>
    </div>
  );

  const handleSubmit = () => {
    const flags = [], explanations = [];
    const lower = (x) => (x || "").toLowerCase();

    if (form.chestPain === "yes") { flags.push("Chest Pain"); explanations.push("May indicate cardiac or pulmonary emergency."); }
    if (form.breathingIssue === "yes") { flags.push("Shortness of Breath"); explanations.push("Possible respiratory distress."); }
    if (form.confusion === "yes") { flags.push("Confusion"); explanations.push("Possible neurological event."); }
    if (form.unconscious === "yes") { flags.push("Unconscious"); explanations.push("Requires immediate evaluation."); }
    if (form.worsening === "yes") { flags.push("Worsening Symptoms"); explanations.push("Condition may be escalating."); }
    if (form.bleeding === "yes") { flags.push("Bleeding"); explanations.push("Potential trauma or internal injury."); }
    if (form.trauma === "yes") { flags.push("Recent Trauma"); explanations.push("Risk of fractures, concussion, internal bleeding."); }
    if (form.vomiting === "yes") { flags.push("Vomiting"); explanations.push("Could indicate GI or systemic distress."); }
    if (form.dizziness === "yes") { flags.push("Dizziness"); explanations.push("Possible neurological or circulatory issue."); }
    if (form.fever === "yes") { flags.push("Fever"); explanations.push("Possible infection or systemic illness."); }
    if (form.painRadiates === "yes") { flags.push("Radiating Pain"); explanations.push("May be cardiac or nerve-related."); }

    if (lower(form.history).includes("heart") || lower(form.complaint).includes("heart")) {
      flags.push("Cardiac History or Symptoms"); explanations.push("Increased cardiac risk.");
    }
    if (lower(form.familyHistory).includes("stroke") || lower(form.familyHistory).includes("heart")) {
      flags.push("Family History of Heart/Stroke"); explanations.push("Elevated risk due to genetics.");
    }

    if (form.pediatric === "yes") { flags.push("Pediatric Patient"); explanations.push("Requires child-specific protocol."); }
    if (form.communication === "yes") { flags.push("Needs Communication Help"); explanations.push("Translator or assistance required."); }
    if (form.accessibility === "yes") { flags.push("Accessibility Needs"); explanations.push("Mobility, vision, or other accommodation needed."); }
    if (form.mentalStatus === "confused" || form.mentalStatus === "agitated") {
      flags.push("Altered Mental Status"); explanations.push("May impact consent or orientation.");
    }
    if (form.allergies === "yes") { flags.push("Reported Allergies"); explanations.push("May cause reactions during treatment."); }
    if (form.onMeds === "yes") { flags.push("Currently on Medications"); explanations.push("Could interact with ER treatments."); }
    if (form.hasDevices === "yes") { flags.push("Has Medical Devices"); explanations.push("Important for imaging or trauma response."); }

    const highRisk = ["unconscious", "confusion", "chestPain", "breathingIssue", "trauma", "bleeding"].some(k => form[k] === "yes");
    let esi = 5, zone = "Fast Track";

    if (form.unconscious === "yes" || form.confusion === "yes") { esi = 1; zone = "Zone 1"; }
    else if (flags.length >= 6) { esi = 2; zone = "Zone 1"; }
    else if (flags.length >= 4) { esi = 3; zone = "Zone 2"; }
    else if (flags.length >= 1) { esi = 4; zone = "Fast Track"; }
    if (form.pediatric === "yes" && esi > 2) esi--;

    const prediction =
      form.chestPain === "yes" ? "Possible heart attack" :
      form.breathingIssue === "yes" ? "Possible respiratory distress" :
      form.fever === "yes" ? "Possible systemic infection" :
      form.confusion === "yes" ? "Possible stroke or neuro issue" :
      "Condition not classified";

    const summary = `--- QPAT ULTRA Triage Summary ---
👤 Name: ${form.name}, Age: ${form.age}, Location: ${form.location}
📝 Complaint: ${form.complaint}
⏱️ Onset: ${form.onset}
📈 Symptoms: ${form.symptoms} | Worsening: ${form.worsening}
📊 Pain Scale: ${form.painLevel}/10
🧾 Arrival: ${form.arrivalMethod} | Visit History: ${form.visitHistory}
📖 History: ${form.history}
🧬 Family History: ${form.familyHistory}
💊 Medications: ${form.medications} | On Meds: ${form.onMeds}
🧪 Allergies: ${form.allergiesList} | Allergy Risk: ${form.allergies}
🧠 Mental Status: ${form.mentalStatus}
🧍 Disabilities: ${form.disabilities}
🧒 Pediatric: ${form.pediatric} ${form.pediatric === "yes" ? `| Guardian: ${form.guardianName}` : ""}
📞 Emergency Contact: ${form.emergencyContact}
♿ Accessibility: ${form.accessibility}
🗣 Communication Help: ${form.communication}
🔌 Medical Devices: ${form.hasDevices}

⚠️ Flags:
${flags.map((f, i) => `• ${f} – ${explanations[i]}`).join("\n")}
🔮 Prediction: ${prediction}
🚦 Risk: ${highRisk ? "HIGH" : "MODERATE"}
🧮 ESI Score: ${esi}
🏥 ER Zone: ${zone}`;

    setResult(summary);
  };
// QPAT ULTRA – App.js Full Version (Part 2 Continued)
// Continues grouped inputs, UI sections, and complete logic

import React, { useState } from "react";

export default function App() {
  const [form, setForm] = useState({
    name: "", age: "", location: "",
    complaint: "", onset: "", symptoms: "", painLevel: "",
    history: "", familyHistory: "", medications: "", allergiesList: "",
    arrivalMethod: "", visitHistory: "", guardianName: "", emergencyContact: "",
    chestPain: "", breathingIssue: "", confusion: "", unconscious: "", worsening: "",
    bleeding: "", trauma: "", vomiting: "", dizziness: "", fever: "", painRadiates: "",
    pediatric: "", accessibility: "", communication: "", mentalStatus: "", disabilities: "",
    allergies: "", onMeds: "", hasDevices: ""
  });

  const [result, setResult] = useState(null);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const renderRadio = (name, label) => (
    <div className="mb-3">
      <p className="font-semibold">{label}</p>
      <label><input type="radio" name={name} value="yes" checked={form[name] === "yes"} onChange={handleChange} className="mr-2" /> Yes</label>
      <label className="ml-4"><input type="radio" name={name} value="no" checked={form[name] === "no"} onChange={handleChange} className="mr-2" /> No</label>
    </div>
  );

  const renderInput = (name, placeholder) => (
    <input name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} className="p-2 border rounded w-full mb-2" />
  );

  const renderTextarea = (name, placeholder) => (
    <textarea name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} className="p-2 border rounded w-full mb-2" />
  );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans">
      <h1 className="text-3xl font-bold text-blue-700">QPAT ULTRA – Emergency Triage Intelligence System</h1>
      <p className="text-gray-500 mb-4">AI-powered clinical triage assistant with full ESI scoring and prediction.</p>

      {/* Patient Info Section */}
      <div className="bg-white rounded-xl shadow p-6 space-y-2">
        <h2 className="text-xl font-semibold">👤 Patient Info</h2>
        {renderInput("name", "Full Name")}
        {renderInput("age", "Age")}
        {renderInput("location", "Location (City/Region)")}
        {renderInput("emergencyContact", "Emergency Contact")}
      </div>

      {/* Complaint Section */}
      <div className="bg-white rounded-xl shadow p-6 space-y-2">
        <h2 className="text-xl font-semibold">🩺 Complaint & Symptoms</h2>
        {renderInput("complaint", "Chief Complaint")}
        {renderInput("onset", "When did it start?")}
        {renderTextarea("symptoms", "Describe symptoms")}
        {renderInput("painLevel", "Pain Level (1–10)")}
        {renderRadio("worsening", "Are symptoms worsening?")}
      </div>

      {/* Emergency Flags */}
      <div className="bg-white rounded-xl shadow p-6 space-y-2">
        <h2 className="text-xl font-semibold">🚨 Emergency Symptoms</h2>
        {renderRadio("chestPain", "Chest Pain")}
        {renderRadio("breathingIssue", "Shortness of Breath")}
        {renderRadio("confusion", "Confusion / Disorientation")}
        {renderRadio("unconscious", "Unconsciousness")}
        {renderRadio("bleeding", "Bleeding")}
        {renderRadio("trauma", "Recent Trauma")}
        {renderRadio("vomiting", "Vomiting")}
        {renderRadio("dizziness", "Dizziness")}
        {renderRadio("fever", "Fever")}
        {renderRadio("painRadiates", "Radiating Pain")}
      </div>

      {/* Medical History */}
      <div className="bg-white rounded-xl shadow p-6 space-y-2">
        <h2 className="text-xl font-semibold">📖 Medical History</h2>
        {renderTextarea("history", "Past medical history")}
        {renderTextarea("familyHistory", "Family medical history")}
        {renderInput("medications", "Current medications")}
        {renderInput("allergiesList", "Known allergies")}
        {renderRadio("allergies", "Do allergies affect care?")}
        {renderRadio("onMeds", "Currently on medications?")}
        {renderRadio("hasDevices", "Uses medical devices?")}
      </div>

      {/* Arrival & Visit */}
      <div className="bg-white rounded-xl shadow p-6 space-y-2">
        <h2 className="text-xl font-semibold">🚗 Arrival & Visit History</h2>
        {renderInput("arrivalMethod", "Arrival Method (e.g., ambulance, walk-in)")}
        {renderInput("visitHistory", "Has the patient been here recently?")}
      </div>

      {/* Special Needs */}
      <div className="bg-white rounded-xl shadow p-6 space-y-2">
        <h2 className="text-xl font-semibold">♿ Special Needs & Context</h2>
        {renderRadio("pediatric", "Is the patient a child (under 16)?")}
        {form.pediatric === "yes" && renderInput("guardianName", "Guardian Name")}
        {renderRadio("accessibility", "Accessibility needs?")}
        {renderRadio("communication", "Needs help communicating?")}
        {renderRadio("mentalStatus", "Altered mental status?")}
        {renderInput("disabilities", "List any known disabilities")}
      </div>

      {/* Submit Section */}
      <div className="text-center">
        <button onClick={handleSubmit} className="bg-blue-600 text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition">
          Submit for Triage
        </button>
      </div>

      {/* Result will be rendered in Part 3 */}
    </div>
  );
}
// QPAT ULTRA – App.js Full Version (Part 4 Final Output Logic)
// This section finalizes the submission logic, scoring, and triage summary output

import React, { useState } from "react";

export default function App() {
  const [form, setForm] = useState({
    name: "", age: "", location: "", complaint: "", onset: "", symptoms: "", painLevel: "",
    history: "", familyHistory: "", medications: "", allergiesList: "",
    arrivalMethod: "", visitHistory: "", guardianName: "", emergencyContact: "",
    chestPain: "", breathingIssue: "", confusion: "", unconscious: "", worsening: "",
    bleeding: "", trauma: "", vomiting: "", dizziness: "", fever: "", painRadiates: "",
    pediatric: "", accessibility: "", communication: "", mentalStatus: "", disabilities: "",
    allergies: "", onMeds: "", hasDevices: ""
  });

  const [result, setResult] = useState(null);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const flags = [], explanations = [];
    const lower = (x) => (x || "").toLowerCase();

    if (form.chestPain === "yes") { flags.push("Chest Pain"); explanations.push("May indicate cardiac or pulmonary emergency."); }
    if (form.breathingIssue === "yes") { flags.push("Shortness of Breath"); explanations.push("Possible respiratory distress."); }
    if (form.confusion === "yes") { flags.push("Confusion"); explanations.push("Possible neurological event."); }
    if (form.unconscious === "yes") { flags.push("Unconscious"); explanations.push("Requires immediate evaluation."); }
    if (form.worsening === "yes") { flags.push("Worsening Symptoms"); explanations.push("Condition may be escalating."); }
    if (form.bleeding === "yes") { flags.push("Bleeding"); explanations.push("Potential trauma or internal injury."); }
    if (form.trauma === "yes") { flags.push("Recent Trauma"); explanations.push("Risk of fractures, concussion, internal bleeding."); }
    if (form.vomiting === "yes") { flags.push("Vomiting"); explanations.push("Could indicate GI or systemic distress."); }
    if (form.dizziness === "yes") { flags.push("Dizziness"); explanations.push("Possible neurological or circulatory issue."); }
    if (form.fever === "yes") { flags.push("Fever"); explanations.push("Possible infection or systemic illness."); }
    if (form.painRadiates === "yes") { flags.push("Radiating Pain"); explanations.push("May be cardiac or nerve-related."); }

    if (lower(form.history).includes("heart") || lower(form.complaint).includes("heart")) {
      flags.push("Cardiac History or Symptoms"); explanations.push("Increased cardiac risk.");
    }
    if (lower(form.familyHistory).includes("stroke") || lower(form.familyHistory).includes("heart")) {
      flags.push("Family History of Heart/Stroke"); explanations.push("Elevated risk due to genetics.");
    }

    if (form.pediatric === "yes") { flags.push("Pediatric Patient"); explanations.push("Requires child-specific protocol."); }
    if (form.communication === "yes") { flags.push("Needs Communication Help"); explanations.push("Translator or assistance required."); }
    if (form.accessibility === "yes") { flags.push("Accessibility Needs"); explanations.push("Mobility, vision, or other accommodation needed."); }
    if (form.mentalStatus === "confused" || form.mentalStatus === "agitated") {
      flags.push("Altered Mental Status"); explanations.push("May impact consent or orientation.");
    }
    if (form.allergies === "yes") { flags.push("Reported Allergies"); explanations.push("May cause reactions during treatment."); }
    if (form.onMeds === "yes") { flags.push("Currently on Medications"); explanations.push("Could interact with ER treatments."); }
    if (form.hasDevices === "yes") { flags.push("Has Medical Devices"); explanations.push("Important for imaging or trauma response."); }

    const highRisk = ["unconscious", "confusion", "chestPain", "breathingIssue", "trauma", "bleeding"].some(k => form[k] === "yes");
    let esi = 5, zone = "Fast Track";
    if (form.unconscious === "yes" || form.confusion === "yes") { esi = 1; zone = "Zone 1"; }
    else if (flags.length >= 6) { esi = 2; zone = "Zone 1"; }
    else if (flags.length >= 4) { esi = 3; zone = "Zone 2"; }
    else if (flags.length >= 1) { esi = 4; zone = "Fast Track"; }
    if (form.pediatric === "yes" && esi > 2) esi--;

    const prediction =
      form.chestPain === "yes" ? "Possible heart attack" :
      form.breathingIssue === "yes" ? "Possible respiratory distress" :
      form.fever === "yes" ? "Possible systemic infection" :
      form.confusion === "yes" ? "Possible stroke or neuro issue" :
      "Condition not classified";

    const summary = `--- QPAT ULTRA Triage Summary ---\n
👤 Name: ${form.name}, Age: ${form.age}, Location: ${form.location}
📝 Complaint: ${form.complaint}
⏱️ Onset: ${form.onset}
📈 Symptoms: ${form.symptoms} | Worsening: ${form.worsening}
📊 Pain Scale: ${form.painLevel}/10
🧾 Arrival: ${form.arrivalMethod} | Visit History: ${form.visitHistory}
📖 History: ${form.history}
🧬 Family History: ${form.familyHistory}
💊 Medications: ${form.medications} | On Meds: ${form.onMeds}
🧪 Allergies: ${form.allergiesList} | Allergy Risk: ${form.allergies}
🧠 Mental Status: ${form.mentalStatus}
🧍 Disabilities: ${form.disabilities}
🧒 Pediatric: ${form.pediatric} ${form.pediatric === "yes" ? `| Guardian: ${form.guardianName}` : ""}
📞 Emergency Contact: ${form.emergencyContact}
♿ Accessibility: ${form.accessibility}
🗣 Communication Help: ${form.communication}
🔌 Medical Devices: ${form.hasDevices}

⚠️ Flags:\n${flags.map((f, i) => `• ${f} – ${explanations[i]}`).join("\n")}
🔮 Prediction: ${prediction}
🚦 Risk: ${highRisk ? "HIGH" : "MODERATE"}
🧮 ESI Score: ${esi}
🏥 ER Zone: ${zone}`;

    setResult(summary);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans">
      {/* UI from previous parts */}
      {/* Results Display */}
      {result && (
        <div className="bg-green-50 border border-green-300 rounded-xl p-6 shadow-xl mt-6">
          <h2 className="text-xl font-bold mb-4">📋 Triage Summary for Nurse</h2>
          <pre className="bg-white p-4 rounded-xl whitespace-pre-wrap text-sm">{result}</pre>
          <button onClick={() => window.print()} className="mt-4 bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-black transition">
            🖨️ Print / Save as PDF
          </button>
        </div>
      )}
    </div>
  );
}
// QPAT ULTRA – App.js Full Version (Part 4 Final Output Logic)
// This section finalizes the submission logic, scoring, and triage summary output

import React, { useState } from "react";

export default function App() {
  const [form, setForm] = useState({
    name: "", age: "", location: "", complaint: "", onset: "", symptoms: "", painLevel: "",
    history: "", familyHistory: "", medications: "", allergiesList: "",
    arrivalMethod: "", visitHistory: "", guardianName: "", emergencyContact: "",
    chestPain: "", breathingIssue: "", confusion: "", unconscious: "", worsening: "",
    bleeding: "", trauma: "", vomiting: "", dizziness: "", fever: "", painRadiates: "",
    pediatric: "", accessibility: "", communication: "", mentalStatus: "", disabilities: "",
    allergies: "", onMeds: "", hasDevices: ""
  });

  const [result, setResult] = useState(null);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const flags = [], explanations = [];
    const lower = (x) => (x || "").toLowerCase();

    if (form.chestPain === "yes") { flags.push("Chest Pain"); explanations.push("May indicate cardiac or pulmonary emergency."); }
    if (form.breathingIssue === "yes") { flags.push("Shortness of Breath"); explanations.push("Possible respiratory distress."); }
    if (form.confusion === "yes") { flags.push("Confusion"); explanations.push("Possible neurological event."); }
    if (form.unconscious === "yes") { flags.push("Unconscious"); explanations.push("Requires immediate evaluation."); }
    if (form.worsening === "yes") { flags.push("Worsening Symptoms"); explanations.push("Condition may be escalating."); }
    if (form.bleeding === "yes") { flags.push("Bleeding"); explanations.push("Potential trauma or internal injury."); }
    if (form.trauma === "yes") { flags.push("Recent Trauma"); explanations.push("Risk of fractures, concussion, internal bleeding."); }
    if (form.vomiting === "yes") { flags.push("Vomiting"); explanations.push("Could indicate GI or systemic distress."); }
    if (form.dizziness === "yes") { flags.push("Dizziness"); explanations.push("Possible neurological or circulatory issue."); }
    if (form.fever === "yes") { flags.push("Fever"); explanations.push("Possible infection or systemic illness."); }
    if (form.painRadiates === "yes") { flags.push("Radiating Pain"); explanations.push("May be cardiac or nerve-related."); }

    if (lower(form.history).includes("heart") || lower(form.complaint).includes("heart")) {
      flags.push("Cardiac History or Symptoms"); explanations.push("Increased cardiac risk.");
    }
    if (lower(form.familyHistory).includes("stroke") || lower(form.familyHistory).includes("heart")) {
      flags.push("Family History of Heart/Stroke"); explanations.push("Elevated risk due to genetics.");
    }

    if (form.pediatric === "yes") { flags.push("Pediatric Patient"); explanations.push("Requires child-specific protocol."); }
    if (form.communication === "yes") { flags.push("Needs Communication Help"); explanations.push("Translator or assistance required."); }
    if (form.accessibility === "yes") { flags.push("Accessibility Needs"); explanations.push("Mobility, vision, or other accommodation needed."); }
    if (form.mentalStatus === "confused" || form.mentalStatus === "agitated") {
      flags.push("Altered Mental Status"); explanations.push("May impact consent or orientation.");
    }
    if (form.allergies === "yes") { flags.push("Reported Allergies"); explanations.push("May cause reactions during treatment."); }
    if (form.onMeds === "yes") { flags.push("Currently on Medications"); explanations.push("Could interact with ER treatments."); }
    if (form.hasDevices === "yes") { flags.push("Has Medical Devices"); explanations.push("Important for imaging or trauma response."); }

    const highRisk = ["unconscious", "confusion", "chestPain", "breathingIssue", "trauma", "bleeding"].some(k => form[k] === "yes");
    let esi = 5, zone = "Fast Track";
    if (form.unconscious === "yes" || form.confusion === "yes") { esi = 1; zone = "Zone 1"; }
    else if (flags.length >= 6) { esi = 2; zone = "Zone 1"; }
    else if (flags.length >= 4) { esi = 3; zone = "Zone 2"; }
    else if (flags.length >= 1) { esi = 4; zone = "Fast Track"; }
    if (form.pediatric === "yes" && esi > 2) esi--;

    const prediction =
      form.chestPain === "yes" ? "Possible heart attack" :
      form.breathingIssue === "yes" ? "Possible respiratory distress" :
      form.fever === "yes" ? "Possible systemic infection" :
      form.confusion === "yes" ? "Possible stroke or neuro issue" :
      "Condition not classified";

    const summary = `--- QPAT ULTRA Triage Summary ---\n
👤 Name: ${form.name}, Age: ${form.age}, Location: ${form.location}
📝 Complaint: ${form.complaint}
⏱️ Onset: ${form.onset}
📈 Symptoms: ${form.symptoms} | Worsening: ${form.worsening}
📊 Pain Scale: ${form.painLevel}/10
🧾 Arrival: ${form.arrivalMethod} | Visit History: ${form.visitHistory}
📖 History: ${form.history}
🧬 Family History: ${form.familyHistory}
💊 Medications: ${form.medications} | On Meds: ${form.onMeds}
🧪 Allergies: ${form.allergiesList} | Allergy Risk: ${form.allergies}
🧠 Mental Status: ${form.mentalStatus}
🧍 Disabilities: ${form.disabilities}
🧒 Pediatric: ${form.pediatric} ${form.pediatric === "yes" ? `| Guardian: ${form.guardianName}` : ""}
📞 Emergency Contact: ${form.emergencyContact}
♿ Accessibility: ${form.accessibility}
🗣 Communication Help: ${form.communication}
🔌 Medical Devices: ${form.hasDevices}

⚠️ Flags:\n${flags.map((f, i) => `• ${f} – ${explanations[i]}`).join("\n")}
🔮 Prediction: ${prediction}
🚦 Risk: ${highRisk ? "HIGH" : "MODERATE"}
🧮 ESI Score: ${esi}
🏥 ER Zone: ${zone}`;

    setResult(summary);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans">
      {/* UI from previous parts */}
      {/* Results Display */}
      {result && (
        <div className="bg-green-50 border border-green-300 rounded-xl p-6 shadow-xl mt-6">
          <h2 className="text-xl font-bold mb-4">📋 Triage Summary for Nurse</h2>
          <pre className="bg-white p-4 rounded-xl whitespace-pre-wrap text-sm">{result}</pre>
          <button onClick={() => window.print()} className="mt-4 bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-black transition">
            🖨️ Print / Save as PDF
          </button>
        </div>
      )}
    </div>
  );
}
