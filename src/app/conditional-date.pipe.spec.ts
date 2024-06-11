import { ConditionalDatePipe } from './conditional-date.pipe';

describe('ConditionalDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ConditionalDatePipe();
    expect(pipe).toBeTruthy();
  });
});
