'use client'

import Select from 'react-select';
import useCountries from '@/app/hooks/useCountries';
import Image from 'next/image';

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            {option.flag && (
              <Image
                src={option.flag}
                alt={`${option.label} flag`}
                width={20}
                height={15}
                style={{ borderRadius: '2px' }}
              />
            )}
            <div>
              {option.label || "Anywhere"}
              {option.region && (
                <span className="text-neutral-500 ml-1">{option.region}</span>
              )}
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: '#fcd75f',
            primary25: '#fef3c7',
          },
        })}
      />
    </div>
  );
}

export default CountrySelect;
