-- Insert categories
INSERT INTO categories (name, slug, description, image_url) VALUES
('육아용품', 'parenting', '아이를 위한 필수 육아용품과 장난감', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop'),
('반려동물', 'pets', '반려동물을 위한 사료, 용품, 장난감', 'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=300&h=200&fit=crop'),
('캠핑용품', 'camping', '캠핑과 아웃도어 활동을 위한 필수 장비', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&h=200&fit=crop'),
('IT 주변기기', 'tech', '컴퓨터, 스마트폰 액세서리 및 전자기기', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop');

-- Insert sample products for 육아용품
INSERT INTO products (category_id, title, description, original_price, sale_price, discount_rate, image_url, coupang_url, brand, rating, review_count, is_featured) 
SELECT 
  c.id,
  '베이비 젖병 세트',
  '신생아부터 사용 가능한 BPA-free 젖병 세트입니다. 다양한 크기로 구성되어 있어 성장 단계별로 사용할 수 있습니다.',
  45000,
  32000,
  29,
  'https://images.unsplash.com/photo-1599582909646-5ad0a3003f8a?w=300&h=300&fit=crop',
  'https://www.coupang.com/vp/products/dummy1',
  '필립스 아벤트',
  4.5,
  1250,
  true
FROM categories c WHERE c.slug = 'parenting';

INSERT INTO products (category_id, title, description, original_price, sale_price, discount_rate, image_url, coupang_url, brand, rating, review_count, is_featured) 
SELECT 
  c.id,
  '유아용 카시트',
  '안전 인증을 받은 프리미엄 유아용 카시트입니다. 360도 회전 기능으로 편리하게 사용할 수 있습니다.',
  380000,
  299000,
  21,
  'https://images.unsplash.com/photo-1544717301-9cdcb1f5940f?w=300&h=300&fit=crop',
  'https://www.coupang.com/vp/products/dummy2',
  '조이',
  4.7,
  890,
  true
FROM categories c WHERE c.slug = 'parenting';

-- Insert sample products for 반려동물
INSERT INTO products (category_id, title, description, original_price, sale_price, discount_rate, image_url, coupang_url, brand, rating, review_count, is_featured) 
SELECT 
  c.id,
  '프리미엄 강아지 사료 15kg',
  '전연령 강아지를 위한 프리미엄 사료입니다. 천연 재료로만 만들어져 소화가 잘되고 영양가가 높습니다.',
  89000,
  67000,
  25,
  'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop',
  'https://www.coupang.com/vp/products/dummy3',
  '로얄캐닌',
  4.6,
  2340,
  true
FROM categories c WHERE c.slug = 'pets';

-- Insert sample products for 캠핑용품
INSERT INTO products (category_id, title, description, original_price, sale_price, discount_rate, image_url, coupang_url, brand, rating, review_count, is_featured) 
SELECT 
  c.id,
  '4인용 돔텐트',
  '방수 기능이 뛰어난 4인용 돔텐트입니다. 설치가 간편하고 통풍이 잘되어 쾌적한 캠핑을 즐길 수 있습니다.',
  180000,
  129000,
  28,
  'https://images.unsplash.com/photo-1504851149312-7a075b496cc5?w=300&h=300&fit=crop',
  'https://www.coupang.com/vp/products/dummy4',
  '코베아',
  4.4,
  567,
  true
FROM categories c WHERE c.slug = 'camping';

-- Insert sample products for IT 주변기기
INSERT INTO products (category_id, title, description, original_price, sale_price, discount_rate, image_url, coupang_url, brand, rating, review_count, is_featured) 
SELECT 
  c.id,
  '무선 게이밍 마우스',
  '고성능 센서를 탑재한 무선 게이밍 마우스입니다. 긴 배터리 수명과 정밀한 트래킹으로 게임에서 우위를 점할 수 있습니다.',
  120000,
  85000,
  29,
  'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
  'https://www.coupang.com/vp/products/dummy5',
  '로지텍',
  4.8,
  1890,
  true
FROM categories c WHERE c.slug = 'tech';

-- Insert more products for each category to have enough for TOP 10 rankings
INSERT INTO products (category_id, title, description, original_price, sale_price, discount_rate, image_url, coupang_url, brand, rating, review_count) 
SELECT 
  c.id,
  '아기 기저귀 대형팩',
  '12시간 흡수력을 자랑하는 프리미엄 기저귀입니다.',
  55000,
  42000,
  24,
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=300&fit=crop',
  'https://www.coupang.com/vp/products/dummy6',
  '팸퍼스',
  4.3,
  3450
FROM categories c WHERE c.slug = 'parenting';

-- Continue with more sample products for rankings...
-- (Adding 8 more products per category for TOP 10 rankings)

-- Insert rankings data
INSERT INTO rankings (category_id, product_id, rank_position, ranking_type)
SELECT 
  p.category_id,
  p.id,
  ROW_NUMBER() OVER (PARTITION BY p.category_id ORDER BY p.rating DESC, p.review_count DESC),
  'top10'
FROM products p
WHERE p.is_active = true;

-- Insert sample reviews
INSERT INTO reviews (product_id, title, content, rating, pros, cons, is_featured)
SELECT 
  p.id,
  '정말 만족스러운 제품입니다',
  '품질이 뛰어나고 가격 대비 성능이 우수합니다. 강력 추천합니다!',
  5,
  ARRAY['뛰어난 품질', '합리적인 가격', '빠른 배송'],
  ARRAY['포장이 아쉬움'],
  true
FROM products p
WHERE p.is_featured = true
LIMIT 5;
