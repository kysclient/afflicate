-- Add high discount rate products for TOP 8 ranking
-- These products have discount rates of 50% or higher

-- High discount products for 육아용품 category
INSERT INTO products (category_id, title, description, original_price, sale_price, discount_rate, image_url, coupang_url, brand, rating, review_count, is_featured) 
SELECT 
  c.id,
  '프리미엄 아기 침대 + 매트리스 세트',
  '천연 소재로 만든 안전한 아기 침대입니다. 성장에 따라 유아침대로 변환 가능하며, 친환경 매트리스가 포함되어 있습니다.',
  450000,
  180000,
  60,
  'https://images.unsplash.com/photo-1586017044570-be81b39f3a2f?w=300&h=300&fit=crop',
  'https://www.coupang.com/vp/products/baby-bed-premium',
  '베베팩토리',
  4.8,
  2340,
  true
FROM categories c WHERE c.slug = 'parenting';

INSERT INTO products (category_id, title, description, original_price, sale_price, discount_rate, image_url, coupang_url, brand, rating, review_count, is_featured) 
SELECT 
  c.id,
  '올인원 유모차 + 카시트 트래블 시스템',
  '신생아부터 36개월까지 사용 가능한 프리미엄 유모차 세트입니다. 카시트와 유모차가 완벽하게 결합되어 편리합니다.',
  680000,
  238000,
  65,
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=300&fit=crop',
  'https://www.coupang.com/vp/products/stroller-premium',
  '스토케',
  4.9,
  1890,
  true
FROM categories c WHERE c.slug = 'parenting';

-- High discount products for 반려동물 category
INSERT INTO products (category_id, title, description, original_price, sale_price, discount_rate, image_url, coupang_url, brand, rating, review_count, is_featured) 
SELECT 
  c.id,
  '스마트 자동 급식기 + 정수기 세트',
  'WiFi 연결로 언제든 원격 제어가 가능한 프리미엄 자동 급식기입니다. 정수 기능이 있어 항상 깨끗한 물을 제공합니다.',
  280000,
  98000,
  65,
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
  'https://www.coupang.com/vp/products/smart-feeder',
  '펫세이프',
  4.6,
  3450,
  true
FROM categories c WHERE c.slug = 'pets';

INSERT INTO products (category_id, title, description, original_price, sale_price, discount_rate, image_url, coupang_url, brand, rating, review_count, is_featured) 
SELECT 
  c.id,
  '대형견용 프리미엄 하우스 + 방석 세트',
  '견종별 맞춤 설계된 고급 펫하우스입니다. 방수, 통풍, 단열 기능이 우수하며 세탁 가능한 방석이 포함되어 있습니다.',
  420000,
  135000,
  68,
  'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=300&h=300&fit=crop',
  'https://www.coupang.com/vp/products/pet-house-premium',
  '아이리스',
  4.7,
  2100,
  true
FROM categories c WHERE c.slug = 'pets';

-- High discount products for 캠핑용품 category
INSERT INTO products (category_id, title, description, original_price, sale_price, discount_rate, image_url, coupang_url, brand, rating, review_count, is_featured) 
SELECT 
  c.id,
  '6인용 프리미엄 패밀리 텐트 + 타프 세트',
  '대가족용 초대형 텐트와 타프 세트입니다. 원터치 설치 방식으로 간편하며, 완전 방수 처리되어 있습니다.',
  850000,
  272000,
  68,
  'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90ca?w=300&h=300&fit=crop',
  'https://www.coupang.com/vp/products/family-tent-premium',
  '코베아',
  4.8,
  1560,
  true
FROM categories c WHERE c.slug = 'camping';

INSERT INTO products (category_id, title, description, original_price, sale_price, discount_rate, image_url, coupang_url, brand, rating, review_count, is_featured) 
SELECT 
  c.id,
  '올인원 캠핑 키친 세트 (테이블+수납+가스버너)',
  '캠핑 요리에 필요한 모든 것이 포함된 올인원 키친 세트입니다. 접이식 테이블과 다단 수납함, 고성능 가스버너가 세트로 구성됩니다.',
  650000,
  195000,
  70,
  'https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=300&h=300&fit=crop',
  'https://www.coupang.com/vp/products/camping-kitchen',
  '카즈미',
  4.7,
  2890,
  true
FROM categories c WHERE c.slug = 'camping';

-- High discount products for IT 주변기기 category
INSERT INTO products (category_id, title, description, original_price, sale_price, discount_rate, image_url, coupang_url, brand, rating, review_count, is_featured) 
SELECT 
  c.id,
  '4K 144Hz 게이밍 모니터 32인치 + 스피커',
  'OLED 패널을 사용한 최고급 게이밍 모니터입니다. HDR 지원, 1ms 응답속도로 프로게이머도 인정하는 성능을 자랑합니다.',
  1200000,
  360000,
  70,
  'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop',
  'https://www.coupang.com/vp/products/gaming-monitor-4k',
  'LG전자',
  4.9,
  4560,
  true
FROM categories c WHERE c.slug = 'tech';

INSERT INTO products (category_id, title, description, original_price, sale_price, discount_rate, image_url, coupang_url, brand, rating, review_count, is_featured) 
SELECT 
  c.id,
  '프리미엄 기계식 키보드 + 게이밍 마우스 세트',
  '체리 적축 스위치를 사용한 고급 기계식 키보드와 무선 게이밍 마우스 세트입니다. RGB 백라이트와 매크로 기능을 지원합니다.',
  480000,
  144000,
  70,
  'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop',
  'https://www.coupang.com/vp/products/keyboard-mouse-set',
  '로지텍',
  4.8,
  3720,
  true
FROM categories c WHERE c.slug = 'tech';

-- Update existing products to create more variety in discount rates
UPDATE products SET 
  original_price = 180000,
  sale_price = 81000,
  discount_rate = 55
WHERE title = '4인용 돔텐트';

UPDATE products SET 
  original_price = 150000,
  sale_price = 67500,
  discount_rate = 55
WHERE title = '무선 게이밍 마우스';

UPDATE products SET 
  original_price = 120000,
  sale_price = 48000,
  discount_rate = 60
WHERE title = '아기 기저귀 대형팩';

-- Add flash sale end times for some products to make them appear in flash sale section
UPDATE products SET 
  is_flash_sale = true,
  flash_sale_end = (NOW() + INTERVAL '2 hours')::timestamp
WHERE discount_rate >= 65
AND is_featured = true
LIMIT 3;