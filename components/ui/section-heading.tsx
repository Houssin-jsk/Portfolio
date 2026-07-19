type SectionHeadingProps = {
  id: string;
  index: string;
  label: string;
  title: string;
  accent?: string;
};

export function SectionHeading({ id, index, label, title, accent }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-kicker"><span>{index}</span><p>{label}</p></div>
      <h2 id={id}>{title}{accent && <><br /><em>{accent}</em></>}</h2>
    </div>
  );
}
