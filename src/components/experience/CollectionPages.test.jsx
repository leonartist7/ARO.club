import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MessagesPage, SavedPage } from './CollectionPages';
import { experienceCopy, experienceLines } from '../../i18n/experience/copy';
vi.mock('next/link',()=>({default:({children,...props})=><a {...props}>{children}</a>}));
vi.mock('../../contexts/LanguageContext',()=>({useLanguage:()=>({language:'en'})}));
afterEach(cleanup);
describe('experience destination journeys',()=>{
  it('offers an honest empty Direct view and a reachable Circle sample',()=>{
    render(<MessagesPage />);
    expect(screen.getByRole('link',{name:'Open a sample Circle'}).getAttribute('href')).toBe('/app/circles/shared-stories');
    fireEvent.click(screen.getByRole('button',{name:'Direct',exact:true}));
    expect(screen.getByRole('heading',{name:'Room for a first hello.'})).toBeTruthy();
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(screen.getByRole('link',{name:'Explore opportunities'}).getAttribute('href')).toBe('/app/world');
  });
  it('filters saved examples and recovers an empty search',()=>{
    render(<SavedPage />);
    expect(screen.getAllByRole('article')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button',{name:'Outdoors'}));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    fireEvent.change(screen.getByRole('searchbox'),{target:{value:'zzzz'}});
    expect(screen.queryByRole('article')).toBeNull();
    fireEvent.click(screen.getByRole('button',{name:'Clear filters'}));
    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.getByRole('searchbox').value).toBe('');
  });
  it('has complete localized copy for every added interaction',()=>{
    for(const [key,values] of Object.entries(experienceLines)) {
      expect(values).toHaveLength(3);
      for(const language of ['en','fr','es']) expect(experienceCopy(language)(key)).not.toBe(key);
    }
  });
});
