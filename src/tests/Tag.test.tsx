import { render, screen } from '@testing-library/react';
import { Tag } from '@/components/Tag';

describe('Tag component', () => {
  it('should render the tag text', () => {
    render(<Tag>test-tag</Tag>);
    expect(screen.getByText('test-tag')).toBeInTheDocument();
  });

  it('should apply correct CSS classes', () => {
    render(<Tag>my-tag</Tag>);
    const tag = screen.getByText('my-tag');
    
    expect(tag).toHaveClass('px-2');
    expect(tag).toHaveClass('py-1');
    expect(tag).toHaveClass('text-xs');
  });

  it('should render multiple tags', () => {
    const { container } = render(
      <>
        <Tag>tag1</Tag>
        <Tag>tag2</Tag>
        <Tag>tag3</Tag>
      </>
    );
    
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
    expect(screen.getByText('tag3')).toBeInTheDocument();
  });
});
