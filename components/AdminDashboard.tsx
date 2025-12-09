
import React, { useState, useEffect } from 'react';
import { useData } from '../context';
import { AppData, Experience, Education, Certification, Testimonial, Service } from '../types';
import { Save, XCircle, Trash2, PlusCircle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { data, updateData, logout } = useData();
  const [formData, setFormData] = useState<AppData>(data);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'services' | 'experience' | 'education' | 'certifications' | 'testimonials' | 'blogs'>('profile');
  const [isDirty, setIsDirty] = useState(false);

  // Sync local state with context on mount only
  useEffect(() => {
    setFormData(JSON.parse(JSON.stringify(data)));
  }, []);

  const handleSave = () => {
    updateData(formData);
    setIsDirty(false);
    alert('Changes saved successfully!');
  };

  const handleCancel = () => {
    setFormData(JSON.parse(JSON.stringify(data)));
    setIsDirty(false);
  };

  const updateField = (section: keyof AppData, update: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: update
    }));
    setIsDirty(true);
  };

  // Helper for input fields
  const InputGroup = ({ label, value, onChange, type = "text", area = false, placeholder = "" }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
      {area ? (
        <textarea
          className="w-full bg-dark-card border border-dark-border rounded px-3 py-2 text-white focus:outline-none focus:border-teal-500 min-h-[100px]"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          className="w-full bg-dark-card border border-dark-border rounded px-3 py-2 text-white focus:outline-none focus:border-teal-500"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );

  const TabButton = ({ id, label }: { id: string, label: string }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={`px-4 py-2 rounded capitalize transition-colors whitespace-nowrap ${
        activeTab === id ? 'bg-teal-600 text-white' : 'text-gray-400 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-dark-bg text-white pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-teal-400">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            {isDirty && (
                <div className="flex gap-2">
                    <button onClick={handleCancel} className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
                        <XCircle size={18} /> Cancel
                    </button>
                    <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/20">
                        <Save size={18} /> Save Changes
                    </button>
                </div>
            )}
            <button onClick={logout} className="px-4 py-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 border border-red-500/20">
                Logout
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-2 mb-8 border-b border-dark-border pb-4 custom-scrollbar">
          <TabButton id="profile" label="Profile" />
          <TabButton id="services" label="Services" />
          <TabButton id="skills" label="Skills" />
          <TabButton id="projects" label="Projects" />
          <TabButton id="experience" label="Experience" />
          <TabButton id="education" label="Education" />
          <TabButton id="certifications" label="Certs" />
          <TabButton id="testimonials" label="Testimonials" />
          <TabButton id="blogs" label="Blogs" />
        </div>

        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Edit Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup
                  label="Name"
                  value={formData.profile.name}
                  onChange={(v: string) => updateField('profile', { ...formData.profile, name: v })}
                />
                 <InputGroup
                  label="Navbar Logo Text (e.g. TWA)"
                  value={formData.profile.navbarTitle}
                  onChange={(v: string) => updateField('profile', { ...formData.profile, navbarTitle: v })}
                />
                 <InputGroup
                  label="Hero Title (e.g. Test With Ankit)"
                  value={formData.profile.heroTitle}
                  onChange={(v: string) => updateField('profile', { ...formData.profile, heroTitle: v })}
                />
                <InputGroup
                  label="Email"
                  value={formData.profile.email}
                  onChange={(v: string) => updateField('profile', { ...formData.profile, email: v })}
                />
                 <InputGroup
                  label="Phone"
                  value={formData.profile.phone}
                  onChange={(v: string) => updateField('profile', { ...formData.profile, phone: v })}
                />
                <InputGroup
                  label="LinkedIn URL"
                  value={formData.profile.linkedin}
                  onChange={(v: string) => updateField('profile', { ...formData.profile, linkedin: v })}
                />
                 <InputGroup
                  label="GitHub URL"
                  value={formData.profile.github}
                  onChange={(v: string) => updateField('profile', { ...formData.profile, github: v })}
                />
                <InputGroup
                  label="Resume Link"
                  value={formData.profile.resumeLink}
                  onChange={(v: string) => updateField('profile', { ...formData.profile, resumeLink: v })}
                />
                <InputGroup
                  label="Location"
                  value={formData.profile.location}
                  onChange={(v: string) => updateField('profile', { ...formData.profile, location: v })}
                />
              </div>
              <InputGroup
                label="Tagline"
                value={formData.profile.tagline}
                onChange={(v: string) => updateField('profile', { ...formData.profile, tagline: v })}
              />
              <InputGroup
                label="Intro (Line 1)"
                value={formData.profile.intro}
                area
                onChange={(v: string) => updateField('profile', { ...formData.profile, intro: v })}
              />
               <InputGroup
                label="Intro (Line 2)"
                value={formData.profile.intro2}
                area
                onChange={(v: string) => updateField('profile', { ...formData.profile, intro2: v })}
              />
               <InputGroup
                label="About (Long)"
                value={formData.profile.about}
                area
                onChange={(v: string) => updateField('profile', { ...formData.profile, about: v })}
              />
            </div>
          )}

          {activeTab === 'services' && (
              <div>
                  <h2 className="text-xl font-bold text-white mb-4">Manage Services</h2>
                   <div className="space-y-6">
                    {formData.services.map((service, idx) => (
                        <div key={service.id} className="p-4 border border-gray-700 rounded bg-black/20 relative group">
                            <button
                                onClick={() => {
                                    const newServices = formData.services.filter(s => s.id !== service.id);
                                    updateField('services', newServices);
                                }}
                                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                <InputGroup
                                    label="Title"
                                    value={service.title}
                                    onChange={(v: string) => {
                                        const newServices = [...formData.services];
                                        newServices[idx] = { ...newServices[idx], title: v };
                                        updateField('services', newServices);
                                    }}
                                />
                                <InputGroup
                                    label="Icon (Lucide Name)"
                                    value={service.icon}
                                    onChange={(v: string) => {
                                        const newServices = [...formData.services];
                                        newServices[idx] = { ...newServices[idx], icon: v };
                                        updateField('services', newServices);
                                    }}
                                />
                            </div>
                            <InputGroup
                                label="Description"
                                value={service.description}
                                onChange={(v: string) => {
                                    const newServices = [...formData.services];
                                    newServices[idx] = { ...newServices[idx], description: v };
                                    updateField('services', newServices);
                                }}
                            />
                            <InputGroup
                                label="Tags (comma separated)"
                                value={service.tags.join(', ')}
                                onChange={(v: string) => {
                                    const newServices = [...formData.services];
                                    newServices[idx] = { ...newServices[idx], tags: v.split(',').map(s => s.trim()) };
                                    updateField('services', newServices);
                                }}
                            />
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            const newService = {
                                id: Date.now().toString(),
                                title: 'New Service',
                                description: 'Description...',
                                icon: 'Layout',
                                tags: ['Tag1']
                            };
                            updateField('services', [...formData.services, newService]);
                        }}
                        className="mt-4 flex items-center gap-2 px-4 py-2 border border-dashed border-gray-600 rounded text-gray-400 hover:text-white hover:border-white transition-colors"
                    >
                        <PlusCircle size={18} /> Add Service
                    </button>
                   </div>
              </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Manage Skills</h2>
              <div className="grid gap-4">
                {formData.skills.map((skill, idx) => (
                  <div key={skill.id} className="flex gap-4 items-center bg-black/20 p-3 rounded">
                    <input
                      className="bg-transparent border-b border-gray-700 text-white w-full focus:outline-none"
                      value={skill.name}
                      onChange={(e) => {
                        const newSkills = [...formData.skills];
                        newSkills[idx] = { ...newSkills[idx], name: e.target.value };
                        updateField('skills', newSkills);
                      }}
                    />
                    <select
                        className="bg-dark-bg border border-gray-700 text-white rounded px-2 py-1 text-sm focus:outline-none"
                        value={skill.category}
                        onChange={(e) => {
                             const newSkills = [...formData.skills];
                            newSkills[idx] = { ...newSkills[idx], category: e.target.value as any };
                            updateField('skills', newSkills);
                        }}
                    >
                        <option value="Manual">Manual</option>
                        <option value="API">API</option>
                        <option value="Database">Database</option>
                        <option value="Automation">Automation</option>
                        <option value="Tools">Tools</option>
                    </select>
                    <input
                      type="number"
                      className="bg-transparent border-b border-gray-700 text-teal-400 w-16 text-center focus:outline-none"
                      value={skill.level}
                      onChange={(e) => {
                        const newSkills = [...formData.skills];
                        newSkills[idx] = { ...newSkills[idx], level: parseInt(e.target.value) };
                        updateField('skills', newSkills);
                      }}
                    />
                     <button
                        onClick={() => {
                            const newSkills = formData.skills.filter(s => s.id !== skill.id);
                            updateField('skills', newSkills);
                        }}
                        className="text-gray-500 hover:text-red-400"
                     >
                         <Trash2 size={18} />
                     </button>
                  </div>
                ))}
                <button
                    onClick={() => {
                        const newSkill = { id: Date.now().toString(), name: 'New Skill', level: 50, category: 'Manual' as const };
                        updateField('skills', [...formData.skills, newSkill]);
                    }}
                    className="mt-4 flex items-center gap-2 px-4 py-2 border border-dashed border-gray-600 rounded text-gray-400 hover:text-white hover:border-white transition-colors"
                >
                    <PlusCircle size={18} /> Add Skill
                </button>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
              <div>
                  <h2 className="text-xl font-bold text-white mb-4">Manage Projects</h2>
                   <div className="space-y-6">
                    {formData.projects.map((project, idx) => (
                        <div key={project.id} className="p-4 border border-gray-700 rounded bg-black/20 relative group">
                            <button
                                onClick={() => {
                                    const newProjects = formData.projects.filter(p => p.id !== project.id);
                                    updateField('projects', newProjects);
                                }}
                                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <InputGroup
                                    label="Project Title"
                                    value={project.title}
                                    onChange={(v: string) => {
                                        const newProjects = [...formData.projects];
                                        newProjects[idx] = { ...newProjects[idx], title: v };
                                        updateField('projects', newProjects);
                                    }}
                                />
                                 <InputGroup
                                    label="Role"
                                    value={project.role}
                                    onChange={(v: string) => {
                                        const newProjects = [...formData.projects];
                                        newProjects[idx] = { ...newProjects[idx], role: v };
                                        updateField('projects', newProjects);
                                    }}
                                />
                            </div>
                            <InputGroup
                                label="Description"
                                area
                                value={project.description}
                                onChange={(v: string) => {
                                    const newProjects = [...formData.projects];
                                    newProjects[idx] = { ...newProjects[idx], description: v };
                                    updateField('projects', newProjects);
                                }}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputGroup
                                    label="Challenges"
                                    area
                                    value={project.challenges}
                                    onChange={(v: string) => {
                                        const newProjects = [...formData.projects];
                                        newProjects[idx] = { ...newProjects[idx], challenges: v };
                                        updateField('projects', newProjects);
                                    }}
                                />
                                <InputGroup
                                    label="Outcome"
                                    area
                                    value={project.outcome}
                                    onChange={(v: string) => {
                                        const newProjects = [...formData.projects];
                                        newProjects[idx] = { ...newProjects[idx], outcome: v };
                                        updateField('projects', newProjects);
                                    }}
                                />
                            </div>
                            <InputGroup
                                label="Link (URL)"
                                value={project.link || ''}
                                onChange={(v: string) => {
                                    const newProjects = [...formData.projects];
                                    newProjects[idx] = { ...newProjects[idx], link: v };
                                    updateField('projects', newProjects);
                                }}
                                placeholder="https://..."
                            />
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            const newProject = { 
                                id: Date.now().toString(), 
                                title: 'New Project', 
                                role: 'QA', 
                                description: '', 
                                challenges: '', 
                                outcome: '', 
                                tags: [], 
                                type: 'Web' as const 
                            };
                            updateField('projects', [...formData.projects, newProject]);
                        }}
                        className="mt-4 flex items-center gap-2 px-4 py-2 border border-dashed border-gray-600 rounded text-gray-400 hover:text-white hover:border-white transition-colors"
                    >
                        <PlusCircle size={18} /> Add Project
                    </button>
                   </div>
              </div>
          )}

          {activeTab === 'experience' && (
              <div>
                  <h2 className="text-xl font-bold text-white mb-4">Manage Experience</h2>
                   <div className="space-y-6">
                    {formData.experience.map((exp, idx) => (
                        <div key={exp.id} className="p-4 border border-gray-700 rounded bg-black/20 relative group">
                            <button
                                onClick={() => {
                                    const newExp = formData.experience.filter(e => e.id !== exp.id);
                                    updateField('experience', newExp);
                                }}
                                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                <InputGroup
                                    label="Company"
                                    value={exp.company}
                                    onChange={(v: string) => {
                                        const newExp = [...formData.experience];
                                        newExp[idx] = { ...newExp[idx], company: v };
                                        updateField('experience', newExp);
                                    }}
                                />
                                <InputGroup
                                    label="Role"
                                    value={exp.role}
                                    onChange={(v: string) => {
                                        const newExp = [...formData.experience];
                                        newExp[idx] = { ...newExp[idx], role: v };
                                        updateField('experience', newExp);
                                    }}
                                />
                                <InputGroup
                                    label="Period"
                                    value={exp.period}
                                    onChange={(v: string) => {
                                        const newExp = [...formData.experience];
                                        newExp[idx] = { ...newExp[idx], period: v };
                                        updateField('experience', newExp);
                                    }}
                                />
                                <InputGroup
                                    label="Location"
                                    value={exp.location}
                                    onChange={(v: string) => {
                                        const newExp = [...formData.experience];
                                        newExp[idx] = { ...newExp[idx], location: v };
                                        updateField('experience', newExp);
                                    }}
                                />
                            </div>
                            <InputGroup
                                label="Description (One bullet point per line)"
                                area
                                value={exp.description.join('\n')}
                                onChange={(v: string) => {
                                    const newExp = [...formData.experience];
                                    newExp[idx] = { ...newExp[idx], description: v.split('\n') };
                                    updateField('experience', newExp);
                                }}
                            />
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            const newExp = {
                                id: Date.now().toString(),
                                company: 'Company Name',
                                role: 'Role',
                                period: '2023 - Present',
                                location: 'Location',
                                description: ['Responsibility 1']
                            };
                            updateField('experience', [...formData.experience, newExp]);
                        }}
                        className="mt-4 flex items-center gap-2 px-4 py-2 border border-dashed border-gray-600 rounded text-gray-400 hover:text-white hover:border-white transition-colors"
                    >
                        <PlusCircle size={18} /> Add Experience
                    </button>
                   </div>
              </div>
          )}

          {activeTab === 'education' && (
              <div>
                  <h2 className="text-xl font-bold text-white mb-4">Manage Education</h2>
                   <div className="space-y-4">
                    {formData.education.map((edu, idx) => (
                        <div key={edu.id} className="p-4 border border-gray-700 rounded bg-black/20 flex gap-4 items-start relative group">
                            <button
                                onClick={() => {
                                    const newEdu = formData.education.filter(e => e.id !== edu.id);
                                    updateField('education', newEdu);
                                }}
                                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-1">
                                    <InputGroup
                                        label="School"
                                        value={edu.school}
                                        onChange={(v: string) => {
                                            const newEdu = [...formData.education];
                                            newEdu[idx] = { ...newEdu[idx], school: v };
                                            updateField('education', newEdu);
                                        }}
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <InputGroup
                                        label="Degree"
                                        value={edu.degree}
                                        onChange={(v: string) => {
                                            const newEdu = [...formData.education];
                                            newEdu[idx] = { ...newEdu[idx], degree: v };
                                            updateField('education', newEdu);
                                        }}
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <InputGroup
                                        label="Year"
                                        value={edu.year}
                                        onChange={(v: string) => {
                                            const newEdu = [...formData.education];
                                            newEdu[idx] = { ...newEdu[idx], year: v };
                                            updateField('education', newEdu);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            const newEdu = {
                                id: Date.now().toString(),
                                school: 'University',
                                degree: 'Degree',
                                year: 'Year'
                            };
                            updateField('education', [...formData.education, newEdu]);
                        }}
                        className="mt-4 flex items-center gap-2 px-4 py-2 border border-dashed border-gray-600 rounded text-gray-400 hover:text-white hover:border-white transition-colors"
                    >
                        <PlusCircle size={18} /> Add Education
                    </button>
                   </div>
              </div>
          )}

          {activeTab === 'certifications' && (
              <div>
                  <h2 className="text-xl font-bold text-white mb-4">Manage Certifications</h2>
                   <div className="space-y-4">
                    {formData.certifications.map((cert, idx) => (
                        <div key={cert.id} className="p-4 border border-gray-700 rounded bg-black/20 relative group">
                             <button
                                onClick={() => {
                                    const newCerts = formData.certifications.filter(c => c.id !== cert.id);
                                    updateField('certifications', newCerts);
                                }}
                                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-1">
                                    <InputGroup
                                        label="Name"
                                        value={cert.name}
                                        onChange={(v: string) => {
                                            const newCerts = [...formData.certifications];
                                            newCerts[idx] = { ...newCerts[idx], name: v };
                                            updateField('certifications', newCerts);
                                        }}
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <InputGroup
                                        label="Provider"
                                        value={cert.provider}
                                        onChange={(v: string) => {
                                            const newCerts = [...formData.certifications];
                                            newCerts[idx] = { ...newCerts[idx], provider: v };
                                            updateField('certifications', newCerts);
                                        }}
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <InputGroup
                                        label="Date"
                                        value={cert.date}
                                        onChange={(v: string) => {
                                            const newCerts = [...formData.certifications];
                                            newCerts[idx] = { ...newCerts[idx], date: v };
                                            updateField('certifications', newCerts);
                                        }}
                                    />
                                </div>
                            </div>
                             <InputGroup
                                label="Link (URL)"
                                value={cert.link || ''}
                                onChange={(v: string) => {
                                    const newCerts = [...formData.certifications];
                                    newCerts[idx] = { ...newCerts[idx], link: v };
                                    updateField('certifications', newCerts);
                                }}
                                placeholder="https://..."
                            />
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            const newCert = {
                                id: Date.now().toString(),
                                name: 'Certification Name',
                                provider: 'Provider',
                                date: 'Year'
                            };
                            updateField('certifications', [...formData.certifications, newCert]);
                        }}
                        className="mt-4 flex items-center gap-2 px-4 py-2 border border-dashed border-gray-600 rounded text-gray-400 hover:text-white hover:border-white transition-colors"
                    >
                        <PlusCircle size={18} /> Add Certification
                    </button>
                   </div>
              </div>
          )}

          {activeTab === 'testimonials' && (
              <div>
                  <h2 className="text-xl font-bold text-white mb-4">Manage Testimonials</h2>
                   <div className="space-y-6">
                    {formData.testimonials.map((test, idx) => (
                        <div key={test.id} className="p-4 border border-gray-700 rounded bg-black/20 relative group">
                             <button
                                onClick={() => {
                                    const newTests = formData.testimonials.filter(t => t.id !== test.id);
                                    updateField('testimonials', newTests);
                                }}
                                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                <InputGroup
                                    label="Name"
                                    value={test.name}
                                    onChange={(v: string) => {
                                        const newTests = [...formData.testimonials];
                                        newTests[idx] = { ...newTests[idx], name: v };
                                        updateField('testimonials', newTests);
                                    }}
                                />
                                <InputGroup
                                    label="Role"
                                    value={test.role}
                                    onChange={(v: string) => {
                                        const newTests = [...formData.testimonials];
                                        newTests[idx] = { ...newTests[idx], role: v };
                                        updateField('testimonials', newTests);
                                    }}
                                />
                                <InputGroup
                                    label="Company"
                                    value={test.company}
                                    onChange={(v: string) => {
                                        const newTests = [...formData.testimonials];
                                        newTests[idx] = { ...newTests[idx], company: v };
                                        updateField('testimonials', newTests);
                                    }}
                                />
                            </div>
                            <InputGroup
                                label="Testimonial Text"
                                area
                                value={test.text}
                                onChange={(v: string) => {
                                    const newTests = [...formData.testimonials];
                                    newTests[idx] = { ...newTests[idx], text: v };
                                    updateField('testimonials', newTests);
                                }}
                            />
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            const newTest = {
                                id: Date.now().toString(),
                                name: 'Client Name',
                                role: 'Role',
                                company: 'Company',
                                text: 'Testimonial...'
                            };
                            updateField('testimonials', [...formData.testimonials, newTest]);
                        }}
                        className="mt-4 flex items-center gap-2 px-4 py-2 border border-dashed border-gray-600 rounded text-gray-400 hover:text-white hover:border-white transition-colors"
                    >
                        <PlusCircle size={18} /> Add Testimonial
                    </button>
                   </div>
              </div>
          )}

          {activeTab === 'blogs' && (
              <div>
                  <h2 className="text-xl font-bold text-white mb-4">Manage Blogs</h2>
                   <div className="space-y-6">
                    {formData.blogs.map((blog, idx) => (
                        <div key={blog.id} className="p-4 border border-gray-700 rounded bg-black/20 relative group">
                             <button
                                onClick={() => {
                                    const newBlogs = formData.blogs.filter(b => b.id !== blog.id);
                                    updateField('blogs', newBlogs);
                                }}
                                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <InputGroup
                                    label="Blog Title"
                                    value={blog.title}
                                    onChange={(v: string) => {
                                        const newBlogs = [...formData.blogs];
                                        newBlogs[idx] = { ...newBlogs[idx], title: v };
                                        updateField('blogs', newBlogs);
                                    }}
                                />
                                 <InputGroup
                                    label="Date"
                                    value={blog.date}
                                    onChange={(v: string) => {
                                        const newBlogs = [...formData.blogs];
                                        newBlogs[idx] = { ...newBlogs[idx], date: v };
                                        updateField('blogs', newBlogs);
                                    }}
                                />
                            </div>
                             <InputGroup
                                    label="Excerpt"
                                    area
                                    value={blog.excerpt}
                                    onChange={(v: string) => {
                                        const newBlogs = [...formData.blogs];
                                        newBlogs[idx] = { ...newBlogs[idx], excerpt: v };
                                        updateField('blogs', newBlogs);
                                    }}
                                />
                             <InputGroup
                                label="Link (URL)"
                                value={blog.link || ''}
                                onChange={(v: string) => {
                                    const newBlogs = [...formData.blogs];
                                    newBlogs[idx] = { ...newBlogs[idx], link: v };
                                    updateField('blogs', newBlogs);
                                }}
                                placeholder="https://..."
                            />
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            const newBlog = { 
                                id: Date.now().toString(), 
                                title: 'New Article', 
                                excerpt: 'Summary...',
                                date: new Date().toLocaleDateString(),
                                category: 'QA',
                                content: ''
                            };
                            updateField('blogs', [...formData.blogs, newBlog]);
                        }}
                        className="mt-4 flex items-center gap-2 px-4 py-2 border border-dashed border-gray-600 rounded text-gray-400 hover:text-white hover:border-white transition-colors"
                    >
                        <PlusCircle size={18} /> Add Blog Post
                    </button>
                   </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};
