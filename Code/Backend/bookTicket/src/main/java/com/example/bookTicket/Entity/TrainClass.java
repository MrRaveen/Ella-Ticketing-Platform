package com.example.bookTicket.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "TRAIN_CLASS")
public class TrainClass {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "CLASS_ID")
	    private int classId;
	    @Column(name = "CLASS_NAME")
	    private String className;
	    @Column(name = "CLASS_LETTER")
	    private String classLetter;
	    @Column(name = "DESCRIPTION")
	    private String description;
		public int getClassId() {
			return classId;
		}
		public void setClassId(int classId) {
			this.classId = classId;
		}
		public String getClassName() {
			return className;
		}
		public void setClassName(String className) {
			this.className = className;
		}
		public String getClassLetter() {
			return classLetter;
		}
		public void setClassLetter(String classLetter) {
			this.classLetter = classLetter;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public TrainClass(String className, String classLetter, String description) {
			super();
			this.className = className;
			this.classLetter = classLetter;
			this.description = description;
		}
		public TrainClass() {
			super();
		}
	    
}
