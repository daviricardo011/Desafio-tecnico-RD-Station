export const RecommendationItem = ({ recommendation, index }) => (
  <li
    key={recommendation.id || index}
    className="p-4 border border-blue-200 rounded-lg shadow-sm bg-white"
  >
    <div className="flex justify-between items-start">
      <p className="text-xl font-semibold text-blue-800">
        {recommendation.name}
      </p>
      {recommendation.category && (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
          {recommendation.category}
        </span>
      )}
    </div>
  </li>
);
