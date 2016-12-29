import { Megzang2Page } from './app.po';

describe('megzang2 App', function() {
  let page: Megzang2Page;

  beforeEach(() => {
    page = new Megzang2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
