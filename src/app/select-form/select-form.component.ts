import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-form',
  templateUrl: './select-form.component.html',
  styleUrls: ['./select-form.component.scss'],
})
export class SelectFormComponent implements OnInit {
  selectedValue = new FormControl('');
  jsonData = {};
  jsonDataOptions = {
    a: {
      user: {
        personal: {
          name: 'Alice',
          contact: {
            email: 'alice@example.com',
            phone: '1234567890',
          },
        },
        preferences: {
          newsletter: true,
          categories: ['Tech', 'Science'],
        },
      },
    },
    b: {
      name: 'John Doe',
      age: 30,
      contact: {
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: {
          street: '123 Elm Street',
          city: 'Springfield',
          state: 'IL',
          zipcode: '62701',
        },
      },
      preferences: {
        notifications: {
          email: true,
          sms: false,
        },
        theme: 'dark',
      },
      skills: [
        {
          name: 'JavaScript',
          level: 'Advanced',
        },
        {
          name: 'Python',
          level: 'Intermediate',
        },
      ],
      projects: [
        {
          title: 'Dynamic Form Builder',
          status: 'Completed',
          details: {
            teamSize: 5,
            duration: '3 months',
            tools: ['Angular', 'TypeScript', 'Node.js'],
          },
        },
        {
          title: 'E-commerce Platform',
          status: 'In Progress',
          details: {
            teamSize: 8,
            duration: '6 months',
            tools: ['React', 'Spring Boot', 'PostgreSQL'],
          },
        },
      ],
      meta: {
        createdBy: 'admin',
        createdAt: '2024-11-01T10:00:00Z',
        updatedBy: 'editor',
        updatedAt: '2024-11-15T15:30:00Z',
      },
    },
  };

  ngOnInit(): void {
    this.selectedValue.valueChanges.subscribe((value) => {
      console.log('Selected value changed:', value);
      this.updateJason(); // Update the displayed value
    });
  }

  updateJason() {
    this.jsonData =
      this.jsonDataOptions[
        (this.selectedValue.value as keyof typeof this.jsonDataOptions) ?? 'a'
      ];
    console.log('JSON you selected:', JSON.stringify(this.jsonData, null, 2));
  }

  getOptions() {
    return Object.keys(this.jsonDataOptions);
  }

  onSubmit() {
    console.log('Selected Value:', this.selectedValue.value);
  }
}
