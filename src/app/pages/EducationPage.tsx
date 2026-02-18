import { useState } from 'react';
import { BookOpen, Play, Search, GraduationCap, Lightbulb, TrendingUp, Star, Clock, ChevronRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: 'ingredients' | 'routines' | 'concerns' | 'seasonal';
  readTime: number;
  rating: number;
  image: string;
  summary: string;
  content: string[];
}

interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  category: string;
}

export default function EducationPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen },
    { id: 'ingredients', name: 'Ingredients', icon: Lightbulb },
    { id: 'routines', name: 'Routines', icon: TrendingUp },
    { id: 'concerns', name: 'Skin Concerns', icon: Star },
    { id: 'seasonal', name: 'Seasonal Care', icon: Clock }
  ];

  const articles: Article[] = [
    {
      id: '1',
      title: 'Understanding Retinol: The Gold Standard Anti-Aging Ingredient',
      category: 'ingredients',
      readTime: 8,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop',
      summary: 'Learn how retinol works, its benefits, and how to incorporate it into your routine safely.',
      content: [
        'Retinol is a derivative of Vitamin A and one of the most researched and proven anti-aging ingredients in skincare.',
        'Benefits include reducing fine lines, improving skin texture, minimizing pores, and evening out skin tone.',
        'Start with a low concentration (0.25-0.5%) and use 2-3 times per week initially.',
        'Always apply at night and follow with sunscreen in the morning.',
        'Common side effects include dryness and peeling, which usually subside after 2-4 weeks.',
        'Never combine with Vitamin C, AHA/BHA acids, or benzoyl peroxide in the same routine.'
      ]
    },
    {
      id: '2',
      title: 'Vitamin C Serums: Brightening and Protection',
      category: 'ingredients',
      readTime: 6,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=600&fit=crop',
      summary: 'Discover why Vitamin C is essential for brightening and protecting your skin.',
      content: [
        'Vitamin C (L-Ascorbic Acid) is a powerful antioxidant that brightens skin and protects against environmental damage.',
        'Look for concentrations between 10-20% for maximum effectiveness.',
        'Best applied in the morning before sunscreen for enhanced UV protection.',
        'Helps fade dark spots, evens skin tone, and boosts collagen production.',
        'Store in a cool, dark place as Vitamin C oxidizes easily.',
        'Pairs well with Vitamin E and Ferulic Acid for enhanced stability.'
      ]
    },
    {
      id: '3',
      title: 'The Perfect Morning Skincare Routine',
      category: 'routines',
      readTime: 10,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop',
      summary: 'Step-by-step guide to creating an effective morning skincare routine.',
      content: [
        'Step 1: Cleanse - Use a gentle, pH-balanced cleanser to remove overnight oils.',
        'Step 2: Tone - Apply a hydrating toner to prep skin for better absorption.',
        'Step 3: Vitamin C Serum - Apply antioxidants for protection and brightening.',
        'Step 4: Eye Cream - Gently pat around the eye area to reduce puffiness.',
        'Step 5: Moisturizer - Lock in hydration with a lightweight day moisturizer.',
        'Step 6: Sunscreen - Always finish with SPF 30+ for UV protection.',
        'Morning routines should focus on protection, hydration, and prep for the day ahead.'
      ]
    },
    {
      id: '4',
      title: 'The Perfect Evening Skincare Routine',
      category: 'routines',
      readTime: 10,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=600&fit=crop',
      summary: 'Maximize your skin\'s repair process with an optimized nighttime routine.',
      content: [
        'Step 1: Double Cleanse - First with oil cleanser, then water-based cleanser.',
        'Step 2: Exfoliate - Use AHA/BHA acids 2-3 times per week.',
        'Step 3: Essence/Toner - Apply hydrating essence for deep moisture.',
        'Step 4: Treatment Serums - Apply targeted treatments like retinol or peptides.',
        'Step 5: Eye Cream - Use a richer formula for overnight repair.',
        'Step 6: Night Cream - Seal everything with a nourishing night moisturizer.',
        'Step 7: Face Oil (optional) - Add an extra layer of nourishment for dry skin.',
        'Night routines should focus on repair, renewal, and deep nourishment.'
      ]
    },
    {
      id: '5',
      title: 'Treating Acne: A Comprehensive Guide',
      category: 'concerns',
      readTime: 12,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=800&h=600&fit=crop',
      summary: 'Evidence-based approaches to treating and preventing acne breakouts.',
      content: [
        'Acne is caused by excess oil production, clogged pores, bacteria, and inflammation.',
        'Key ingredients: Salicylic Acid (2%), Benzoyl Peroxide (2.5-5%), Niacinamide (5-10%).',
        'Always use a gentle, non-stripping cleanser - harsh cleansers worsen acne.',
        'Introduce actives slowly - one at a time, 2-3 times per week initially.',
        'Never skip moisturizer - dehydrated skin produces more oil to compensate.',
        'Sunscreen is essential - many acne treatments increase sun sensitivity.',
        'Be patient - it takes 6-12 weeks to see significant improvement.',
        'Consult a dermatologist for persistent or severe acne.'
      ]
    },
    {
      id: '6',
      title: 'Hyperpigmentation: Causes and Solutions',
      category: 'concerns',
      readTime: 9,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop',
      summary: 'Learn how to fade dark spots and prevent future hyperpigmentation.',
      content: [
        'Hyperpigmentation occurs when melanin is overproduced in certain areas.',
        'Common causes: sun damage, acne scarring, hormonal changes, inflammation.',
        'Best ingredients: Vitamin C, Niacinamide, Alpha Arbutin, Tranexamic Acid.',
        'Prescription options: Hydroquinone (4%), Tretinoin, Azelaic Acid (15-20%).',
        'Consistent sunscreen use (SPF 50+) is essential - sun exposure darkens spots.',
        'Results take time - expect to see improvement after 8-12 weeks.',
        'Chemical peels and laser treatments can accelerate results.',
        'Prevention is key - treat inflammation quickly and protect from sun.'
      ]
    },
    {
      id: '7',
      title: 'Winter Skincare: Protecting Your Skin in Cold Weather',
      category: 'seasonal',
      readTime: 7,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop',
      summary: 'Adjust your routine to combat dryness and irritation during winter months.',
      content: [
        'Cold weather and indoor heating strip moisture from skin, causing dryness.',
        'Switch to a creamier, oil-based cleanser to prevent stripping natural oils.',
        'Layer hydrating products: essence → serum → moisturizer → face oil.',
        'Use a humidifier indoors to maintain optimal moisture levels.',
        'Don\'t skip sunscreen - UV rays are present year-round.',
        'Exfoliate gently to remove dead skin but avoid over-exfoliation.',
        'Apply moisturizer to damp skin to lock in maximum hydration.',
        'Consider adding occlusive ingredients like petrolatum or ceramides.'
      ]
    },
    {
      id: '8',
      title: 'Summer Skincare: Sun Protection and Oil Control',
      category: 'seasonal',
      readTime: 7,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=600&fit=crop',
      summary: 'Keep your skin protected and balanced during hot, humid months.',
      content: [
        'Increase sun protection with SPF 50+ and reapply every 2 hours.',
        'Switch to lightweight, gel-based moisturizers for humid weather.',
        'Use oil-free, non-comedogenic products to prevent breakouts.',
        'Incorporate antioxidants (Vitamin C, E) for enhanced sun protection.',
        'Exfoliate regularly to prevent clogged pores from increased sweating.',
        'Keep skincare products in the fridge for a cooling, soothing effect.',
        'Hydrate from within - drink plenty of water throughout the day.',
        'Consider using a mineral sunscreen with zinc oxide for sensitive skin.'
      ]
    },
    {
      id: '9',
      title: 'Hyaluronic Acid: The Ultimate Hydration Hero',
      category: 'ingredients',
      readTime: 6,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=600&fit=crop',
      summary: 'Why hyaluronic acid is essential for plump, hydrated skin at any age.',
      content: [
        'Hyaluronic Acid (HA) is a humectant that holds up to 1000x its weight in water.',
        'Suitable for all skin types - even oily and acne-prone skin needs hydration.',
        'Apply to damp skin for maximum absorption and effectiveness.',
        'Look for multiple molecular weights for multi-layer hydration.',
        'Can be used both morning and evening without any conflicts.',
        'Pairs beautifully with all other ingredients and actives.',
        'In dry climates, follow immediately with a moisturizer to prevent water loss.',
        'Consistent use results in plumper, smoother, more supple skin.'
      ]
    }
  ];

  const videos: Video[] = [
    {
      id: '1',
      title: 'How to Layer Your Skincare Products',
      duration: '8:24',
      thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=400&fit=crop',
      category: 'Routines'
    },
    {
      id: '2',
      title: 'Double Cleansing Method Explained',
      duration: '5:12',
      thumbnail: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=400&fit=crop',
      category: 'Techniques'
    },
    {
      id: '3',
      title: 'Retinol for Beginners: What You Need to Know',
      duration: '10:45',
      thumbnail: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop',
      category: 'Ingredients'
    },
    {
      id: '4',
      title: 'Understanding Your Skin Type',
      duration: '6:30',
      thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
      category: 'Basics'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fbf3fe] to-[#ece2f9] pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 text-[#8b63d3] font-semibold mb-6 hover:gap-3 transition-all"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Back to Education Hub
          </button>

          {/* Article Content */}
          <article className="backdrop-blur-lg bg-white/80 rounded-3xl shadow-xl overflow-hidden border border-white/50">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-1.5 rounded-full bg-[#8b63d3]/20 text-[#8b63d3] text-sm font-semibold capitalize">
                  {selectedArticle.category}
                </span>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{selectedArticle.readTime} min read</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold">{selectedArticle.rating}</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedArticle.title}
              </h1>

              <p className="text-lg text-gray-600 mb-8 pb-8 border-b border-gray-200">
                {selectedArticle.summary}
              </p>

              <div className="space-y-6">
                {selectedArticle.content.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Key Takeaways */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#8b63d3]/10 to-[#6b46b8]/10 border border-[#8b63d3]/20">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#8b63d3]/20 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-[#8b63d3]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Remember</h3>
                    <p className="text-sm text-gray-700">
                      Everyone's skin is unique. What works for others may not work for you. Always patch test new products and introduce them gradually into your routine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbf3fe] to-[#ece2f9] pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b63d3] to-[#6b46b8] mb-4 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Education Hub
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master your skincare journey with expert guides, ingredient deep-dives, and science-backed advice.
          </p>
        </div>

        {/* Search Bar */}
        <div className="backdrop-blur-lg bg-white/70 rounded-2xl shadow-lg p-4 mb-8 border border-white/50">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, ingredients, tips..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#8b63d3] focus:ring-2 focus:ring-[#8b63d3]/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#8b63d3] to-[#6b46b8] text-white shadow-lg'
                    : 'bg-white/70 text-gray-700 hover:bg-white/90 border border-white/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Video Tutorials Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Play className="w-6 h-6 text-[#8b63d3]" />
            Video Tutorials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="backdrop-blur-lg bg-white/70 rounded-2xl overflow-hidden shadow-lg border border-white/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-[#8b63d3] ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/70 text-white text-xs font-semibold">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold text-[#8b63d3] mb-1 block">
                    {video.category}
                  </span>
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#8b63d3]" />
            Articles & Guides
          </h2>
          
          {filteredArticles.length === 0 ? (
            <div className="backdrop-blur-lg bg-white/70 rounded-2xl shadow-lg p-12 border border-white/50 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No articles found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="backdrop-blur-lg bg-white/70 rounded-2xl overflow-hidden shadow-lg border border-white/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[#8b63d3] text-xs font-semibold capitalize">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#8b63d3] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime} min</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-semibold">{article.rating}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#8b63d3] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
