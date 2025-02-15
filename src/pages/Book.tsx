import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { activities } from "../data/activities";
import { categories } from "../data/categories";

export default function Book() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? activity.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Book Your Adventure
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Choose from our exciting range of activities
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          {/* Filters */}
          <div className="lg:w-1/4">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>

              {/* Search */}
              <div className="mt-4">
                <label htmlFor="search" className="sr-only">
                  Search activities
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search activities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <Search className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Category filter */}
              <div className="mt-6">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Activity Selection */}
          <div className="lg:w-3/4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="cursor-pointer rounded-lg border-2 bg-white p-4 border-gray-200 hover:border-indigo-200"
                >
                  <Link to={`/activity/${activity.id}`} className="block">
                    <img
                      src={activity.image}
                      alt={activity.name}
                      className="h-32 w-full rounded-lg object-cover"
                    />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      {activity.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {activity.description}
                    </p>
                    <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <dt className="font-medium text-gray-500">Duration</dt>
                        <dd className="text-gray-900">
                          {activity.duration} min
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-500">Price</dt>
                        <dd className="text-gray-900">${activity.price}</dd>
                      </div>
                    </dl>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
