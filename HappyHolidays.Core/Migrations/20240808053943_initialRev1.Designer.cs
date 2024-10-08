﻿// <auto-generated />
using System;
using HappyHolidays.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HappyHolidays.Core.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240808053943_initialRev1")]
    partial class initialRev1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("HappyHolidays.Core.ItineraryDescription", b =>
                {
                    b.Property<int>("ItineraryDescriptionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ItineraryDescriptionId"));

                    b.Property<string>("ItenaryPoints")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ItineraryDetailsId")
                        .HasColumnType("int");

                    b.HasKey("ItineraryDescriptionId");

                    b.HasIndex("ItineraryDetailsId");

                    b.ToTable("ItineraryDescription");
                });

            modelBuilder.Entity("HappyHolidays.Core.ItineraryDetails", b =>
                {
                    b.Property<int>("ItineraryDetailsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ItineraryDetailsId"));

                    b.Property<string>("ItineraryTitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PackageDetailsId")
                        .HasColumnType("int");

                    b.HasKey("ItineraryDetailsId");

                    b.HasIndex("PackageDetailsId");

                    b.ToTable("ItineraryDetails");
                });

            modelBuilder.Entity("HappyHolidays.Core.Package", b =>
                {
                    b.Property<int>("PackageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PackageId"));

                    b.Property<decimal?>("ActualPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("Days")
                        .HasColumnType("int");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<int?>("Nights")
                        .HasColumnType("int");

                    b.Property<decimal?>("OriginalPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("PackageLocation")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("PackageName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("PackageType")
                        .HasColumnType("int");

                    b.HasKey("PackageId");

                    b.ToTable("Packages");
                });

            modelBuilder.Entity("HappyHolidays.Core.PackageDetails", b =>
                {
                    b.Property<int>("PackageDetailsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PackageDetailsId"));

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.HasKey("PackageDetailsId");

                    b.HasIndex("PackageId")
                        .IsUnique();

                    b.ToTable("PackageDetails");
                });

            modelBuilder.Entity("HappyHolidays.Core.ItineraryDescription", b =>
                {
                    b.HasOne("HappyHolidays.Core.ItineraryDetails", "ItineraryDetails")
                        .WithMany("ItineraryDescriptions")
                        .HasForeignKey("ItineraryDetailsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ItineraryDetails");
                });

            modelBuilder.Entity("HappyHolidays.Core.ItineraryDetails", b =>
                {
                    b.HasOne("HappyHolidays.Core.PackageDetails", "PackageDetails")
                        .WithMany("ItineraryDetails")
                        .HasForeignKey("PackageDetailsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PackageDetails");
                });

            modelBuilder.Entity("HappyHolidays.Core.PackageDetails", b =>
                {
                    b.HasOne("HappyHolidays.Core.Package", "Package")
                        .WithOne("PackageDetails")
                        .HasForeignKey("HappyHolidays.Core.PackageDetails", "PackageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Package");
                });

            modelBuilder.Entity("HappyHolidays.Core.ItineraryDetails", b =>
                {
                    b.Navigation("ItineraryDescriptions");
                });

            modelBuilder.Entity("HappyHolidays.Core.Package", b =>
                {
                    b.Navigation("PackageDetails")
                        .IsRequired();
                });

            modelBuilder.Entity("HappyHolidays.Core.PackageDetails", b =>
                {
                    b.Navigation("ItineraryDetails");
                });
#pragma warning restore 612, 618
        }
    }
}
