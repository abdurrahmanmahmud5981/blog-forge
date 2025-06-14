'use client';

import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Heart, MessageCircle, Eye, Sparkles, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const BlogHomepage = () => {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  // Mock blog data
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Web Development",
      snippet: "Exploring how artificial intelligence is revolutionizing the way we build and design websites. From automated code generation to intelligent UX optimization, discover the cutting-edge tools shaping tomorrow's web.",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        initials: "SC"
      },
      tags: ["AI", "Web Development", "Technology"],
      date: "2025-06-12",
      likes: 142,
      comments: 18,
      views: 1256,
      readTime: "5 min read",
      featured: true,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Mastering React Hooks: Advanced Patterns",
      snippet: "Deep dive into advanced React Hooks patterns that will make your components more efficient and maintainable. Learn custom hooks, optimization techniques, and best practices.",
      author: {
        name: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        initials: "AR"
      },
      tags: ["React", "JavaScript", "Frontend"],
      date: "2025-06-11",
      likes: 267,
      comments: 32,
      views: 1889,
      readTime: "8 min read",
      featured: false,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Building Scalable APIs with Next.js",
      snippet: "Learn how to create robust, scalable APIs using Next.js API routes. Best practices for authentication, database integration, and performance optimization for modern applications.",
      author: {
        name: "Michael Park",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        initials: "MP"
      },
      tags: ["Next.js", "API", "Backend"],
      date: "2025-06-10",
      likes: 134,
      comments: 16,
      views: 892,
      readTime: "6 min read",
      featured: false,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop"
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox: When to Use What",
      snippet: "Understanding the differences between CSS Grid and Flexbox layouts. Practical examples and use cases to help you choose the right tool for your next project.",
      author: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        initials: "EW"
      },
      tags: ["CSS", "Layout", "Design"],
      date: "2025-06-09",
      likes: 89,
      comments: 12,
      views: 543,
      readTime: "4 min read",
      featured: false,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
    },
    {
      id: 5,
      title: "Database Design Best Practices for 2025",
      snippet: "Modern approaches to database design, including NoSQL patterns, schema optimization, and scalability considerations for growing applications.",
      author: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        initials: "DK"
      },
      tags: ["Database", "Architecture", "Backend"],
      date: "2025-06-08",
      likes: 156,
      comments: 24,
      views: 721,
      readTime: "7 min read",
      featured: false,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop"
    },
    {
      id: 6,
      title: "TypeScript Tips for React Developers",
      snippet: "Essential TypeScript patterns and techniques that every React developer should know. Improve type safety and developer experience in your projects.",
      author: {
        name: "Lisa Zhang",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        initials: "LZ"
      },
      tags: ["TypeScript", "React", "JavaScript"],
      date: "2025-06-07",
      likes: 203,
      comments: 28,
      views: 1123,
      readTime: "6 min read",
      featured: false,
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop"
    }
  ];

  const trendingTags = ["React", "Next.js", "JavaScript", "AI", "TypeScript", "CSS", "Node.js", "Database"];

  useEffect(() => {
    let filtered = blogPosts;
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }
    
    setFilteredPosts(filtered);
  }, [searchTerm, selectedTag]);

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.length > 0 ? filteredPosts : blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Dev<span className="text-muted-foreground">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover cutting-edge insights, tutorials, and stories from the world of web development
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles, topics, or technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-6 text-lg bg-white/95 border-0 focus:ring-2 focus:ring-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Trending Tags */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Trending Topics</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedTag === '' ? "default" : "outline"}
              onClick={() => setSelectedTag('')}
              className={selectedTag === '' ? "bg-black text-white hover:bg-black/90" : ""}
            >
              All Topics
            </Button>
            {trendingTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                className={selectedTag === tag ? "bg-black text-white hover:bg-black/90" : ""}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && !searchTerm && !selectedTag && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Featured Article</h2>
            </div>
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-1/2 relative overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="default" className="bg-black text-white">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Featured
                    </Badge>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredPost.tags.map(tag => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-3xl mb-4 hover:text-muted-foreground transition-colors">
                      {featuredPost.title}
                    </CardTitle>
                    <CardDescription className="text-lg leading-relaxed">
                      {featuredPost.snippet}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardFooter className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={featuredPost.author.avatar} alt={featuredPost.author.name} />
                        <AvatarFallback>{featuredPost.author.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{featuredPost.author.name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(featuredPost.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {featuredPost.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="bg-black text-white hover:bg-black/90">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-8">
            {searchTerm || selectedTag ? 'Search Results' : 'Latest Articles'}
          </h2>
        </div>

        {regularPosts.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or browse all topics</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map(post => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <CardTitle className="text-xl group-hover:text-muted-foreground transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  
                  <CardDescription className="line-clamp-3 leading-relaxed">
                    {post.snippet}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback className="text-xs">{post.author.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{post.author.name}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {post.readTime}
                    </Badge>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <Separator className="mb-4" />
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleLike(post.id)}
                        className={`p-0 h-auto ${likedPosts.has(post.id) ? 'text-red-500' : ''}`}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                        {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                      </Button>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views}
                      </span>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {regularPosts.length > 0 && (
          <div className="text-center mt-12">
            <Button size="lg" className="bg-black text-white hover:bg-black/90">
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogHomepage;