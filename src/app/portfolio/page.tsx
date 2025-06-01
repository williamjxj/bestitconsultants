'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PortfolioPage() {
  const { translations } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: translations.portfolio.categories.all },
    { id: 'web', label: translations.portfolio.categories.web },
    { id: 'mobile', label: translations.portfolio.categories.mobile },
    { id: 'ai', label: translations.portfolio.categories.ai },
    { id: 'cloud', label: translations.portfolio.categories.cloud },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? translations.portfolio.projects
      : translations.portfolio.projects.filter(
          (project) => project.category === selectedCategory,
        );

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {translations.portfolio.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {translations.portfolio.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="mb-12"
        >
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:mx-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="px-6"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm overflow-hidden"
            >
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-4xl">{project.icon}</div>
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="space-x-3">
                    <Button variant="secondary" size="sm">
                      {translations.portfolio.viewDemo}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-white border-white hover:bg-white hover:text-black"
                    >
                      {translations.portfolio.viewCode}
                    </Button>
                  </div>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {project.description}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {
                      categories.find((cat) => cat.id === project.category)
                        ?.label
                    }
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      {translations.portfolio.keyFeatures}:
                    </h4>
                    <ul className="text-sm space-y-1">
                      {project.features
                        .slice(0, 3)
                        .map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <span className="text-green-500 mr-2 text-xs">
                              ✓
                            </span>
                            {feature}
                          </li>
                        ))}
                    </ul>
                  </div>

                  {project.metrics && (
                    <div className="pt-3 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        {translations.portfolio.results}:
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(project.metrics).map(
                          ([key, value], metricIndex) => (
                            <div
                              key={metricIndex}
                              className="text-center p-2 bg-gray-50 rounded"
                            >
                              <div className="font-bold text-blue-600">
                                {value}
                              </div>
                              <div className="text-gray-600 capitalize">
                                {key}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            {translations.portfolio.successStories.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {translations.portfolio.successStories.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-medium mb-2">{stat.label}</div>
                <div className="text-gray-600 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            {translations.portfolio.technologies.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {translations.portfolio.technologies.list.map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2">{tech.icon}</div>
                <div className="text-sm font-medium text-center">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            {translations.portfolio.cta.title}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {translations.portfolio.cta.subtitle}
          </p>
          <div className="space-x-4">
            <Button size="lg" variant="secondary">
              {translations.portfolio.cta.startProject}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600"
            >
              {translations.portfolio.cta.viewMore}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
