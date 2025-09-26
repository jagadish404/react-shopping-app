interface NoResultsProps {
  content: string;
}

const NoResults = ({ content }: NoResultsProps) => (
  <div className="no-results">
    <p>{content}</p>
  </div>
);

export default NoResults;
