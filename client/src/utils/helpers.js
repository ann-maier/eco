export const transformEmissions = (emissions) => {
  const elementIds = [...new Set(emissions.map(({ idElement }) => idElement))];

  // {
  //     [element]: { [Year]: { [Month]: { avg: ValueAvg, max: ValueMax } } }
  // }
  let transformedData = {};

  emissions.forEach(({ idElement, ValueAvg, ValueMax, Year, Month }) => {
    elementIds.forEach((elementId) => {
      if (elementId === idElement) {
        if (transformedData[elementId]) {
          if (transformedData[idElement][Year]) {
            if (transformedData[idElement][Year][Month]) {
              const { avg, max } = transformedData[idElement][Year][Month];

              transformedData[idElement][Year][Month] = {
                avg: ValueAvg + avg,
                max: ValueMax + max,
              };
            } else {
              transformedData[idElement][Year][Month] = {
                avg: ValueAvg,
                max: ValueMax,
              };
            }
          } else {
            transformedData[idElement][Year] = {
              [Month]: { avg: ValueAvg, max: ValueMax },
            };
          }
        } else {
          transformedData[idElement] = {
            [Year]: { [Month]: { avg: ValueAvg, max: ValueMax } },
          };
        }
      }
    });
  });

  return transformedData;
};

export const formatMonthDataForBarChart = (
  transformedEmissions,
  elementId,
  year
) =>
  transformedEmissions &&
  elementId &&
  year &&
  Object.keys(transformedEmissions[elementId][year]).map((month) => ({
    month,
    average: transformedEmissions[elementId][year][month].avg,
    max: transformedEmissions[elementId][year][month].max,
  }));

export const getElementName = (emissions, emissionId) => [
  ...new Set(
    emissions
      .filter(({ idElement }) => Number(emissionId) === idElement)
      .map(({ short_name }) => short_name)
  ),
];

export const removeObjectDuplicates = (items, prop) =>
  items.filter(
    (obj, index, arr) =>
      arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === index
  );

export const findAverageForEmissionCalculations = (emissionCalculations) => {
  const elementNames = [];

  emissionCalculations.forEach((emission) => {
    if (!elementNames.includes(emission.element)) {
      elementNames.push(emission.element);
    }
  });

  return elementNames.map((name) => {
    let temp = { name, quantity: 0, total: 0 };

    emissionCalculations.forEach((emission) => {
      if (temp.name === emission.element) {
        temp.total += emission.averageCalculations.average;
        temp.quantity++;
      }
    });

    return {
      name: temp.name,
      value: temp.total / temp.quantity,
    };
  });
};

export const findMaxForEmissionCalculations = (emissionCalculations) => {
  const elementNames = [];

  emissionCalculations.forEach((emission) => {
    if (!elementNames.includes(emission.element)) {
      elementNames.push(emission.element);
    }
  });

  return elementNames.map((name) => {
    let temp = { name, value: 0 };

    emissionCalculations.forEach((emission) => {
      if (temp.name === emission.element) {
        if (emission.maximumCalculations.max > temp.value) {
          temp.value = emission.maximumCalculations.max;
        }
      }
    });

    return temp;
  });
};
