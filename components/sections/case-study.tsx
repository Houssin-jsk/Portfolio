import { ArrowUpRight, Check, Rows3 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  { index: "01", label: "Source", text: "Inspect the raw information and identify gaps, inconsistent formats, and unclear fields." },
  { index: "02", label: "Prepare", text: "Correct, clean, and structure the data so the analysis starts from a reliable base." },
  { index: "03", label: "Analyze", text: "Define useful KPIs and examine the patterns that answer the business question." },
  { index: "04", label: "Explain", text: "Translate the findings into reporting and a dashboard designed for clear reading." },
];

export function CaseStudy() {
  return (
    <section className="section case-study" id="case-study" aria-labelledby="case-study-title">
      <Reveal><SectionHeading id="case-study-title" index="03" label="Featured case study" title="A complete" accent="BI workflow." /></Reveal>
      <div className="case-intro">
        <Reveal className="case-question"><span>The question</span><h3>What should a decision-maker understand from this data?</h3></Reveal>
        <Reveal className="case-answer" delay={.08}><p>Rather than beginning with a dashboard, the project begins with the quality of the source. Preparation, KPI definition, analysis, and visual decisions all lead to one final reporting experience.</p><a href="#work">Explore related work <ArrowUpRight aria-hidden="true" /></a></Reveal>
      </div>
      <div className="case-panel">
        <Reveal className="workflow-panel">
          <div className="panel-head"><span>Process / 01—04</span><Rows3 aria-hidden="true" /></div>
          <ol>{steps.map((step) => <li key={step.index}><b>{step.index}</b><div><h3>{step.label}</h3><p>{step.text}</p></div><Check aria-hidden="true" /></li>)}</ol>
        </Reveal>
        <Reveal className="report-preview" delay={.1}>
          <div className="panel-head"><span>Replaceable project visual</span><span>BI / REPORT</span></div>
          <div className="preview-grid"><div className="preview-axis"/><div className="preview-chart"><i/><i/><i/><i/><i/></div><div className="preview-lines"><span/><span/><span/></div></div>
          <div className="preview-caption"><p>Final reporting experience</p><span>Anonymized dashboard screenshots can replace this structured preview without changing the layout.</span></div>
        </Reveal>
      </div>
    </section>
  );
}
