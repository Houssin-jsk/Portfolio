type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  accent?: string;
};

export function SectionHeading({ index, label, title, accent }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-kicker"><span>{index}</span><p>{label}</p></div>
      <h2>{title}{accent && <><br /><em>{accent}</em></>}</h2>
    </div>
  );
}
