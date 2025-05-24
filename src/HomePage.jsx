import React from "react";

export default function HomePage() {
  return (
    <div className="container">
      <div>
        <h2> Selecting Best Alternative for Carbon Capture, Separation, and Utilization (CCSU) </h2>
        <p> Empowering sustainable cement manufacturing through informed technology selection. </p>
      </div>

      <div>
        <h3>About the Project</h3>
        <p>
          This platform presents an interactive decision-making tool designed to evaluate
          carbon capture, separation, and utilization (CCSU) technologies applicable to
          cement manufacturing in Sri Lanka. Developed using a Multi-Criteria Decision
          Analysis (MCDA) approach, it enables stakeholders to compare technology
          alternatives based on environmental, economic, and technical criteria.
        </p>
        <p>
          This web page has been developed to support the undergraduate dissertation for the
          BSc. (Hons) in Quantity Surveying degree program at the University of Moratuwa.
        </p>
        <h3>Research Objectives</h3>
        <ul>
          <li>Identify and assess CCSU technologies suitable for cement production.</li>
          <li>Establish and categorize evaluation criteria.</li>
          <li>Determine criteria weights using the Best-Worst Method (BWM).</li>
          <li>Rank alternatives using the TOPSIS method.</li>
          <li>Deploy an interactive web-based decision-support platform.</li>
        </ul>

        <h3>Why CCSU in the Cement Industry?</h3>
        <p>
          Cement manufacturing contributes significantly to global CO₂ emissions, with over 60%
          arising from raw material calcination. In Sri Lanka, addressing these emissions is
          vital for meeting climate targets and promoting sustainable development. CCSU
          technologies offer promising solutions by capturing and converting CO₂ into valuable
          products, enabling circular economy integration.
        </p>

        <h3>Key Features</h3>
        <ul>
          <li>Interactive TOPSIS-based decision tool</li>
          <li>Information hub for CCSU technologies</li>
          <li>Focus on Sri Lanka’s cement sector context</li>
          <li>Data-driven with real survey inputs</li>
          <li>Dynamic visualizations for comparing alternatives</li>
        </ul>

        <br />
        <p>Developed by: H.H.A Prasad Hemantha, Undergraduate Researcher, Department of Building Economics, University of Moratuwa</p>
        <p>Supervised by: Ch. QS Dr. Nuwantha Uduwage, Senior Lecturer, Department of Building Economics, University of Moratuwa</p>

      </div>
    </div >
  );
}