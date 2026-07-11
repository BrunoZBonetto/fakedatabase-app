const DISEASE_MEDICATION_PT: Record<string, string[]> = {
  'Diabetes Tipo 1': ['Insulina Glargina','Insulina Regular','Insulina Lispro'],
  'Diabetes Tipo 2': ['Metformina','Glifage','Insulina Glargina','Gliclazida'],
  'Hipertensão Arterial': ['Losartana','Captopril','Hidroclorotiazida','Anlodipino','Valsartana'],
  'Asma': ['Salbutamol','Budesonida','Aerolin','Formoterol','Montelucaste'],
  'Rinite Alérgica': ['Loratadina','Cetirizina','Desloratadina','Fexofenadina'],
  'Bronquite': ['Salbutamol','Amoxicilina','Prednisona','Azitromicina'],
  'Enxaqueca': ['Paracetamol','Ibuprofeno','Sumatriptana','Rizatriptana','Naproxeno'],
  'Ansiedade': ['Fluoxetina','Sertralina','Clonazepam','Diazepam','Escitalopram','Buspirona'],
  'Depressão': ['Fluoxetina','Sertralina','Paroxetina','Escitalopram','Venlafaxina','Amitriptilina'],
  'Hipotireoidismo': ['Levotiroxina','Eutirox','Puran'],
  'Hipertireoidismo': ['Metimazol','Propiltiouracila','Carbimazol'],
  'Colesterol Alto': ['Sinvastatina','Atorvastatina','Rosuvastatina','Ezetimiba'],
  'Obesidade': ['Metformina','Orlistate','Sibutramina','Liraglutida'],
  'Artrite Reumatoide': ['Ibuprofeno','Prednisona','Metotrexato','Adalimumabe','Etanercepte'],
  'Osteoporose': ['Carbonato de Cálcio','Alendronato','Vitamina D3','Risedronato'],
  'Gastrite': ['Omeprazol','Pantoprazol','Ranitidina','Esomeprazol','Pirenzepina'],
  'Refluxo Gastroesofágico': ['Omeprazol','Pantoprazol','Domperidona','Esomeprazol','Lansoprazol'],
  'Sinusite': ['Amoxicilina','Azitromicina','Prednisona','Cefalexina'],
  'Dermatite Atópica': ['Cetirizina','Prednisona','Dexametasona tópica','Tacrolimo','Hidrocortisona'],
  'Psoríase': ['Metotrexato','Ciclosporina','Adalimumabe','Etanercepte','Ácido Fólico'],
  'Insônia': ['Zolpidem','Melatonina','Diazepam','Doxepina','Rivotril'],
  'Epilepsia': ['Carbamazepina','Valproato de Sódio','Lamotrigina','Levetiracetam','Fenitoína'],
};

const DISEASE_MEDICATION_EN: Record<string, string[]> = {
  'Type 1 Diabetes': ['Insulin Glargine','Insulin Lispro','Insulin Aspart'],
  'Type 2 Diabetes': ['Metformin','Glipizide','Insulin Glargine','Glimepiride'],
  'Hypertension': ['Lisinopril','Losartan','Hydrochlorothiazide','Amlodipine','Valsartan'],
  'Asthma': ['Albuterol','Budesonide','Fluticasone','Montelukast','Formoterol'],
  'Allergic Rhinitis': ['Loratadine','Cetirizine','Fexofenadine','Desloratadine'],
  'Bronchitis': ['Albuterol','Amoxicillin','Prednisone','Azithromycin'],
  'Migraine': ['Ibuprofen','Sumatriptan','Rizatriptan','Naproxen','Acetaminophen'],
  'Anxiety Disorder': ['Sertraline','Fluoxetine','Clonazepam','Diazepam','Escitalopram','Buspirone'],
  'Depression': ['Fluoxetine','Sertraline','Paroxetine','Escitalopram','Venlafaxine','Amitriptyline'],
  'Hypothyroidism': ['Levothyroxine','Synthroid','Levoxyl'],
  'Hyperthyroidism': ['Methimazole','Propylthiouracil','Carbimazole'],
  'High Cholesterol': ['Atorvastatin','Simvastatin','Rosuvastatin','Ezetimibe'],
  'Obesity': ['Metformin','Orlistat','Phentermine','Liraglutide','Semaglutide'],
  'Rheumatoid Arthritis': ['Ibuprofen','Prednisone','Methotrexate','Adalimumab','Etanercept'],
  'Osteoporosis': ['Calcium Carbonate','Alendronate','Vitamin D3','Risedronate'],
  'GERD': ['Omeprazole','Pantoprazole','Famotidine','Esomeprazole','Lansoprazole'],
  'Sinusitis': ['Amoxicillin','Azithromycin','Prednisone','Cephalexin'],
  'Eczema': ['Cetirizine','Prednisone','Hydrocortisone cream','Tacrolimus','Eucrisa'],
  'Celiac Disease': ['Gluten-free diet','Vitamin D','Calcium supplement','Iron supplement'],
  'Insomnia': ['Zolpidem','Melatonin','Diazepam','Doxepin','Trazodone'],
  'Epilepsy': ['Carbamazepine','Valproic Acid','Lamotrigine','Levetiracetam','Phenytoin'],
};

export function getDiseaseMedicationMap(locale: string): Record<string, string[]> {
  if (locale === 'pt-BR') {
    return DISEASE_MEDICATION_PT;
  }
  return DISEASE_MEDICATION_EN;
}
