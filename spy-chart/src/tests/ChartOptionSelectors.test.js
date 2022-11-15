import { render, screen, fireEvent, within } from '@testing-library/react';
import moment from 'moment';
import ChartOptionSelectors from '../components/ChartOptionSelectors'
import { Theme } from '../models/Themes';
import { dummyData } from './dummyData';

  it('format selector should have correct value after a change', async () => {
    await testSelector("format-selector", ['-1', '0', '1', '2', '3', '4', '5'], 2, /1 dp/i)
  });

  it('grid lines selector should have correct value after a change', async () => {
    await testSelector("gridlines-selector", ["Show", "Hide"], 0, /show/i)
  });

  it('theme selector should have correct value after a change', async () => {
    await testSelector("themes-selector", ["LIGHT", "DARK"], 0, /light/i)
  });


  async function testSelector(testId, valuesList, valueIndexToClick, textToFind) {
    const { getByTestId } = render(<ChartOptionSelectors data={dummyData} theme={Theme.LIGHT} format={-1} fromDate={undefined} toDate={undefined} showGridLines={true} onSelectedFormat={() => {}} onSelectedFromDate={() => {}} onSelectedToDate={() => {}} onShowGridLinesChanged={() => {}} onSelectedTheme={() => {}} />);

    const selectCompoEl = getByTestId(testId);

    const button = within(selectCompoEl).getByRole('button');
    fireEvent.mouseDown(button);

    const listbox = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );

    const options = within(listbox).getAllByRole('option');
    const optionValues = options.map((li) => li.getAttribute('data-value'));

    expect(optionValues).toEqual(valuesList);

    fireEvent.click(options[valueIndexToClick]);

    expect(await screen.findByText(textToFind)).toBeInTheDocument();
  } 