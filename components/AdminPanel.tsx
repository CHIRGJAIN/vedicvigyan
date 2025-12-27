'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, FileText, Settings, Database, Download, Upload, Eye, Edit, Trash2 } from 'lucide-react'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('members')
  const [members] = useState([
    {
      id: 1,
      domain: 'vves.org',
      accountLogin: 'dr.madhuri.sharon',
      userName: 'Dr. Madhuri Sharon',
      password: '********',
      mobileNo: '+91 98765 43210',
      email: 'madhuri.sharon@vves.org',
      role: 'Founder & Director',
      joinDate: '2018-01-15',
      status: 'Active'
    },
    {
      id: 2,
      domain: 'vves.org',
      accountLogin: 'prof.rajesh.verma',
      userName: 'Prof. Rajesh Verma',
      password: '********',
      mobileNo: '+91 98765 43211',
      email: 'rajesh.verma@vves.org',
      role: 'Research Head',
      joinDate: '2018-02-01',
      status: 'Active'
    },
    {
      id: 3,
      domain: 'vves.org',
      accountLogin: 'dr.priya.sharma',
      userName: 'Dr. Priya Sharma',
      password: '********',
      mobileNo: '+91 98765 43212',
      email: 'priya.sharma@vves.org',
      role: 'Academic Director',
      joinDate: '2018-03-15',
      status: 'Active'
    }
  ])

  const [contentPages] = useState([
    { id: 1, name: 'Home Page', lastUpdated: '2024-01-15', status: 'Published' },
    { id: 2, name: 'About Us', lastUpdated: '2024-01-10', status: 'Published' },
    { id: 3, name: 'Courses', lastUpdated: '2024-01-12', status: 'Published' },
    { id: 4, name: 'Research', lastUpdated: '2024-01-08', status: 'Published' },
    { id: 5, name: 'Library', lastUpdated: '2024-01-05', status: 'Published' },
    { id: 6, name: 'Events', lastUpdated: '2024-01-14', status: 'Published' }
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indian-maroon text-white p-6">
            <h1 className="text-3xl font-bold">VVES Admin Panel</h1>
            <p className="text-white/80 mt-2">Manage members, content, and system settings</p>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {[
                { id: 'members', name: 'Members', icon: Users },
                { id: 'content', name: 'Content Management', icon: FileText },
                { id: 'analytics', name: 'Analytics', icon: Database },
                { id: 'settings', name: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium transition-colors duration-300 ${
                    activeTab === tab.id
                      ? 'border-indian-red text-indian-red'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'members' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Member Database</h2>
                  <button className="btn-primary flex items-center">
                    <Upload size={16} className="mr-2" />
                    Add New Member
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Domain</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Account Login</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">User Name</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Mobile No</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Email</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Role</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Status</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50">
                          <td className="border border-gray-200 px-4 py-3">{member.domain}</td>
                          <td className="border border-gray-200 px-4 py-3">{member.accountLogin}</td>
                          <td className="border border-gray-200 px-4 py-3">{member.userName}</td>
                          <td className="border border-gray-200 px-4 py-3">{member.mobileNo}</td>
                          <td className="border border-gray-200 px-4 py-3">{member.email}</td>
                          <td className="border border-gray-200 px-4 py-3">{member.role}</td>
                          <td className="border border-gray-200 px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              member.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="border border-gray-200 px-4 py-3">
                            <div className="flex space-x-2">
                              <button className="p-1 text-blue-600 hover:text-blue-800">
                                <Eye size={16} />
                              </button>
                              <button className="p-1 text-green-600 hover:text-green-800">
                                <Edit size={16} />
                              </button>
                              <button className="p-1 text-red-600 hover:text-red-800">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <p className="text-gray-600">Showing {members.length} members</p>
                  <button className="btn-secondary flex items-center">
                    <Download size={16} className="mr-2" />
                    Export Data
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'content' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
                  <button className="btn-primary flex items-center">
                    <Upload size={16} className="mr-2" />
                    Upload Content
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contentPages.map((page) => (
                    <div key={page.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{page.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          page.status === 'Published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {page.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Last updated: {page.lastUpdated}
                      </p>
                      <div className="flex space-x-2">
                        <button className="btn-secondary text-sm px-3 py-1">Edit</button>
                        <button className="btn-accent text-sm px-3 py-1">Preview</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    { label: 'Total Visitors', value: '15,420', change: '+12%' },
                    { label: 'Active Members', value: '1,250', change: '+8%' },
                    { label: 'Course Enrollments', value: '450', change: '+15%' },
                    { label: 'Research Downloads', value: '2,100', change: '+20%' }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-sm font-medium text-gray-600 mb-2">{stat.label}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      'New member registration: Dr. Amit Patel',
                      'Course enrollment: Vimaan Shastra Course',
                      'Research paper uploaded: Durva Grass Study',
                      'Event registration: Vedic Science Workshop'
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-indian-red rounded-full"></div>
                        <span>{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h2>
                
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup & Restore</h3>
                    <div className="flex space-x-4">
                      <button className="btn-primary flex items-center">
                        <Download size={16} className="mr-2" />
                        Create Backup
                      </button>
                      <button className="btn-secondary flex items-center">
                        <Upload size={16} className="mr-2" />
                        Restore Backup
                      </button>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Two-Factor Authentication</span>
                        <button className="btn-primary text-sm px-4 py-2">Enable</button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">SSL Certificate</span>
                        <span className="text-green-600 text-sm font-semibold">Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Configuration</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          SMTP Server
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-transparent"
                          placeholder="smtp.vves.org"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Admin Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-red focus:border-transparent"
                          placeholder="admin@vves.org"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}



