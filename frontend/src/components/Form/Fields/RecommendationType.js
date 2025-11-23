import { Checkbox } from '../../shared/Checkbox';
import { SectionWrapper } from '../../Containers/SectionWrapper';

const options = [
  { label: 'Produto Único', value: 'SingleProduct' },
  { label: 'Múltiplos Produtos', value: 'MultipleProducts' },
];

export function RecommendationType({ onRecommendationTypeChange, hasError }) {
  return (
    <SectionWrapper title="Tipo de Recomendação:" hasError={hasError}>
      <div className="flex items-left gap-4 flex-col md:flex-row">
        {options.map((opt) => (
          <Checkbox
            type="radio"
            name="recommendationType"
            value={opt.value}
            onChange={() => onRecommendationTypeChange(opt.value)}
            key={opt.value}
          >
            {opt.label}
          </Checkbox>
        ))}
      </div>
      {hasError && (
        <p className="text-red-500 text-sm mt-1 font-bold">Campo obrigatório</p>
      )}
    </SectionWrapper>
  );
}
